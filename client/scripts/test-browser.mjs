import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin = 'http://127.0.0.1:4173';
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'pipe' });
let serverOutput = '';
server.stdout.on('data', data => { serverOutput += data; });
server.stderr.on('data', data => { serverOutput += data; });
let browser;
try {
  for (let attempt = 0; ; attempt++) {
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (attempt > 50 || server.exitCode !== null) throw new Error(`Preview server did not start: ${serverOutput}`);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  await mkdir('test-results', { recursive: true });
  for (const configuration of [
    { name: 'desktop', viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' },
    { name: 'mobile', viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' },
    { name: 'narrow-mobile', viewport: { width: 320, height: 640 }, reducedMotion: 'no-preference' },
    { name: 'tablet', viewport: { width: 768, height: 1024 }, reducedMotion: 'no-preference' },
    { name: 'landscape', viewport: { width: 844, height: 390 }, reducedMotion: 'no-preference' },
    { name: 'reduced-motion', viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' },
  ].filter(configuration => !process.env.TEST_VIEWPORTS || process.env.TEST_VIEWPORTS.split(',').includes(configuration.name))) {
    const context = await browser.newContext(configuration);
    const page = await context.newPage();
    const errors = [];
    const requests = [];
    page.on('pageerror', error => errors.push(error.stack || error.message));
    page.on('request', request => requests.push(request.url()));
    page.on('response', response => {
      if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(origin, { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { level: 1 }).waitFor();
    assert(await page.locator('.hero-card-stack').evaluate(card => {
      const bounds = card.getBoundingClientRect();
      const actions = card.querySelector('.hero-actions').getBoundingClientRect();
      return bounds.top >= document.querySelector('.navbar').getBoundingClientRect().bottom - 1
        && bounds.left >= 0 && bounds.right <= innerWidth + 1
        && actions.bottom <= bounds.bottom + 1
        && (innerWidth <= 650 || bounds.bottom + 20 <= innerHeight);
    }), 'The introduction is clipped, overlaps navigation, or overflows the screen');
    assert.equal(await page.locator('.hero-text details').count(), 0, 'Biography is hidden in a toggle');
    assert.deepEqual(await page.locator('.hero-skills .skill-tag').allTextContents(), ['JavaScript', 'HTML', 'CSS', 'React', 'Flutter', 'Figma', 'UI/UX Design']);
    if (configuration.name === 'desktop') {
      const downloadEvent = page.waitForEvent('download');
      await page.getByRole('link', { name: 'Download CV', exact: true }).click();
      const download = await downloadEvent;
      assert.equal(download.suggestedFilename(), 'Josephine-Magat-CV-placeholder.txt');
      const file = await page.request.get(download.url());
      assert(file.ok() && (await file.text()).includes('placeholder, not my CV'));
    }
    assert(!requests.some(url => /PersonalSide-|Watchlist-|Music-|GameShelf-/.test(url)), 'Room code loaded before visiting room');
    assert(await page.evaluate(() => {
      const event = new WheelEvent('wheel', { deltaY: 100, cancelable: true, bubbles: true });
      document.body.dispatchEvent(event);
      return !event.defaultPrevented;
    }), 'Wheel scrolling was intercepted');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Portfolio overflows horizontally');
    await page.screenshot({ path: `test-results/${configuration.name}-portfolio.png` });

    const menu = page.getByRole('button', { name: /^Menu/ });
    if (await menu.isVisible()) {
      await menu.click();
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await menu.click();
    }
    await page.getByRole('link', { name: 'Certificates', exact: true }).click();
    await page.waitForFunction(() => {
      const top = document.getElementById('certificates-title').getBoundingClientRect().top;
      const bottom = document.querySelector('.navbar').getBoundingClientRect().bottom;
      return top >= bottom - 2 && top < innerHeight - 24;
    });
    await page.locator('#portfolio-nav-links a[href="#certificates"][aria-current="location"]').waitFor({ state: 'attached' });

    await page.getByRole('button', { name: 'View MYSTICA project', exact: true }).click();
    await page.locator('dialog[open]').waitFor();
    await page.locator('dialog[open] img').first().evaluate(image => image.decode());
    // Clicking inside dialog padding must not dismiss it.
    await page.locator('dialog[open]').evaluate(dialog => dialog.click());
    assert.equal(await page.locator('dialog[open]').count(), 1);
    await page.keyboard.press('Escape');
    await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    // Click card padding, outside the original View Certificate button.
    await page.locator('.certificate-card').first().click({ position: { x: 12, y: 12 } });
    await page.locator('.certificate-detail-image').evaluate(image => image.decode());
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'View CompTIA ITF+ Certified certificate', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.locator('dialog[open] .certificate-detail-image').waitFor();
    await page.mouse.click(5, 5);
    await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    assert(await page.getByRole('button', { name: 'View CompTIA ITF+ Certified certificate', exact: true }).evaluate(button => button === document.activeElement), 'Certificate focus was not restored');

    const returnPosition = await page.evaluate(() => {
      const id = document.querySelector('#portfolio-nav-links a[aria-current="location"]').hash.slice(1);
      return { id, offset: document.getElementById(id).getBoundingClientRect().top };
    });
    await page.getByRole('button', { name: 'Explore my room', exact: true }).click();
    await page.locator('.room-entered').waitFor();
    await page.getByRole('link', { name: 'Back to portfolio' }).waitFor();
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Room overflows horizontally');
    await page.screenshot({ path: `test-results/${configuration.name}-room.png` });
    for (const label of ['Watchlist', 'Reading List', 'Game Shelf', 'Music Corner', 'Personal Computer']) {
      await page.getByRole('button', { name: 'EXPLORE ROOM', exact: true }).click();
      await page.getByRole('navigation', { name: 'Explore the room' }).getByRole('button', { name: new RegExp(label) }).click();
      await page.locator('dialog[open].watchlist-overlay, dialog[open].pc-overlay').waitFor();
      await page.getByRole('heading', { level: 2, name: label, exact: true }).waitFor();
      await page.locator('dialog[open]').evaluate(dialog => Promise.allSettled(dialog.getAnimations().map(animation => animation.finished)));
      assert(await page.locator('dialog[open]').evaluate(dialog => dialog.contains(document.activeElement)), 'Dialog did not receive focus');
      assert(await page.getByRole('button', { name: label === 'Music Corner' ? 'Close Music Corner' : label === 'Personal Computer' ? 'Close computer' : 'Close details', exact: true }).evaluate(button => {
        const bounds = button.getBoundingClientRect();
        return bounds.width >= 44 && bounds.height >= 44;
      }), `${label}: close button is too small`);
      await page.screenshot({ path: `test-results/${configuration.name}-${label.replaceAll(' ', '-')}.png` });
      if (['Watchlist', 'Reading List', 'Game Shelf'].includes(label)) {
        assert.equal(await page.getByRole('searchbox').count(), 0, 'Collections should be browsable without search');
        assert.equal(await page.locator('.collection-eyebrow').count(), 0, 'Collection captions should be removed');
        await page.locator('dialog[open] .reading-list-card-button').first().click();
        await page.locator('.reading-list-peek.is-visible').waitFor();
        await page.keyboard.press('Escape');
        await page.locator('.reading-list-peek').waitFor({ state: 'detached' });
        assert(await page.locator('dialog[open]').count(), 'Closing details closed the collection');
      }
      if (label === 'Personal Computer') {
        const folders = page.getByRole('navigation', { name: 'Computer folders' });
        await page.getByRole('button', { name: /A little about me/ }).click();
        const about = folders.getByRole('button', { name: 'About Me', exact: true });
        assert(await about.evaluate(button => button === document.activeElement), 'About shortcut lost keyboard focus');
        await page.locator('.pc-folder-content').evaluate(content => { content.scrollTop = content.scrollHeight; });
        for (const name of ['Favorites', 'Currents', 'Welcome']) {
          const folder = folders.getByRole('button', { name, exact: true });
          await folder.click();
          assert.equal(await folder.getAttribute('aria-current'), 'page');
          assert.equal(await page.locator('.pc-folder-content').evaluate(content => content.scrollTop), 0, 'Folder retained the previous scroll position');
        }
      }
      if (label === 'Music Corner') {
        for (const tab of ['Songs', 'Playlists']) {
          await page.getByRole('tab', { name: tab, exact: true }).click();
          const cards = page.locator('.music-song-list button');
          assert.equal(await cards.count(), 4);
          for (const card of await cards.all()) {
            await card.click();
            assert.equal(await card.getAttribute('aria-pressed'), 'true');
            assert.equal(await page.locator('.music-pick-card h3').textContent(), await card.locator('.music-song-title').textContent());
          }
          const link = page.getByRole('link', { name: /Open in Spotify/ });
          assert.match(await link.getAttribute('href'), /^https:\/\/open\.spotify\.com\//);
          assert.equal(await link.getAttribute('target'), '_blank');
        }
        assert.equal(await page.locator('.music-overlay iframe').count(), 0, 'Music embeds should be removed');
      }
      await page.keyboard.press('Escape');
      await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    }
    await page.getByRole('link', { name: 'Back to portfolio' }).click();
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.waitForFunction(position => Math.abs(document.getElementById(position.id).getBoundingClientRect().top - position.offset) < 3, returnPosition);
    await page.goto(`${origin}/#room`, { waitUntil: 'domcontentloaded' });
    await page.locator('.room-entered').waitFor();
    assert.deepEqual(errors, [], `${configuration.name}: browser errors`);
    console.log(`PASS ${configuration.name}: navigation, native scroll, whole-card clicks, keyboard focus, touch targets, detail panels, all dialogs, room return position, direct entry, no runtime errors`);
    await context.close();
  }

  // Simulate real loading failures so visitors always have a way out.
  for (const failure of ['room-code', 'room-artwork', 'collection-code']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const pattern = failure === 'room-code' ? '**/PersonalSide-*.js' : failure === 'room-artwork' ? '**/room.jpg-*.webp' : '**/Watchlist-*.js';
    await page.route(pattern, route => route.abort());
    await page.goto(`${origin}/#room`, { waitUntil: 'domcontentloaded' });
    if (failure === 'room-code') {
      await page.getByRole('alert').waitFor();
      await page.getByRole('link', { name: 'Back to portfolio' }).click();
      await page.getByRole('heading', { level: 1 }).waitFor();
    } else if (failure === 'room-artwork') {
      await page.getByText("The room artwork couldn't load. Use Explore Room to open any collection.", { exact: true }).waitFor();
      await page.getByRole('button', { name: 'EXPLORE ROOM', exact: true }).click();
      await page.getByRole('navigation', { name: 'Explore the room' }).getByRole('button', { name: /Watchlist/ }).click();
      await page.locator('dialog[open].watchlist-overlay').waitFor();
    } else {
      await page.getByRole('button', { name: 'EXPLORE ROOM', exact: true }).click();
      await page.getByRole('navigation', { name: 'Explore the room' }).getByRole('button', { name: /Watchlist/ }).click();
      await page.getByRole('heading', { name: 'Collection unavailable' }).waitFor();
      await page.getByRole('button', { name: 'Back to room', exact: true }).click();
      await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    }
    console.log(`PASS recovery: ${failure}`);
    await context.close();
  }
} finally {
  await browser?.close();
  server.kill();
}
