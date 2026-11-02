# Security checklist

Reviewed on **9 October 2026** for jsphnmgt Portfolio, a public static React website deployed through GitHub Pages.

Each answer records what was checked. **No** also identifies checks that remain unverified; it does not claim that an unverified setting is disabled.

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` excludes `.env` and `.env.*`; `git check-ignore` confirmed root/client paths, and `git ls-files` listed no environment files. |
| 2 | A `.env.example` with placeholder values only is committed | N/A | No secret configuration is required. The only build setting is the public `VITE_BASE_PATH`, set from the repository name in the Pages workflow. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | Reviewed `client/src`, asset-fetching scripts and the workflow; no authentication credentials or database connection strings were found. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Searched all Git history for these terms, PostgreSQL URLs, key prefixes and private-key headers; credential-like matches were template placeholders, local-development examples or environment references. |
| 5 | Any credential that was ever committed has been rotated | N/A | The history review found no real service credential requiring rotation; deleted template database examples were not production credentials. |
| 6 | Production credentials live only in my hosting provider's environment settings | N/A | This static portfolio has no custom production credentials; GitHub Pages uses GitHub-provided deployment authentication. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | Reviewed `.github/workflows/deploy-pages.yml`; it contains permissions and a public base path, with no literal credentials. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | N/A | The Pages workflow does not require custom repository secrets; deployment uses GitHub-provided identity and permissions. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | No | Workflow source contains no secret-printing step, but logs for successful run `37851263862` could not be retrieved without authenticated access, so the log check remains unverified. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | The workflow uploads `client/dist`; a fresh successful production build was inspected and contained no `.env`, private-key files or separate credential configuration. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | No | The workflow uses version tags: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`. |
| 12 | Secret scanning and push protection are enabled on the repository | No | These repository security settings could not be verified through the available unauthenticated access; they still need checking in GitHub Settings. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | N/A | The project has no database queries or backend. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | N/A | No database is connected to the portfolio. |
| 15 | The database user the app connects as has only the permissions it needs | N/A | No database user or database credentials are configured. |
| 16 | Seed and sample data is invented, not real people's data | N/A | There are no database seed scripts; collection JSON files contain portfolio content and media preferences. |
| 17 | Debug, seed and reset routes are removed before going public | N/A | The deployed site has no backend/API routes, seed endpoints or reset endpoints. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | No | The portfolio is intentionally public and read-only; `App.jsx` switches between professional and room views without a login or access gate. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | N/A | This portfolio does not use Supabase or Firebase; those technologies are only mentioned in descriptions of other projects. |
| 20 | If Zero Trust: tjakoen.s@gmail.com is on the access policy. If an app password: the credentials are in my private workspace `project/README.md` | N/A | No Zero Trust policy or app password is used, so there are no gate credentials or access-policy members to configure. |
| 21 | The gate covers every route, including the ones that only change data | N/A | No access gate or data-changing server route exists; the portfolio serves public static content. |
| 22 | The credentials for the gate are environment variables, not in source | N/A | There is no access gate and no gate credential. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | N/A | There is no server accepting user submissions; site controls navigate local content and open collection details or Spotify embeds. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | Text is rendered through React JSX; no `dangerouslySetInnerHTML`, direct `innerHTML` assignment or `eval()` was found in the client source. The site does not accept submitted user text. |
| 25 | Error responses do not expose stack traces, file paths or connection details | N/A | There is no application backend returning API errors or database connection details; GitHub Pages serves static files. |
| 26 | CORS is not a wildcard on routes that change data | N/A | The project exposes no data-changing API routes and has no application CORS configuration. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | No | `Contact.jsx` intentionally includes the author's contact email, so this check cannot be marked Yes even though it is part of the public portfolio. |
| 28 | No classmate's personal data in the repository | No | The source, documentation and collection data review found no classmate records, but screenshots and other media have not received a complete privacy review. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | Resolved packages in `client/package-lock.json` use `registry.npmjs.org`; `.gitignore` excludes `node_modules/`, and no dependency folder is tracked. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | No | The README acknowledges third-party media ownership, but individual permissions, licenses and credits for all artwork, covers and photos are not fully documented. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | Public visibility was chosen for GitHub Pages. GitHub's repository API confirmed `visibility: public` and `private: false` for `jsphnmgt/avys-portfolio` on 9 October 2026. |

## Anything I found and fixed

I corrected the environment-file answer after confirming that `.env` is ignored and untracked, and checked source code, Git history and a fresh production build for credentials. The review identified movable action tags, a deliberately public contact email, and incomplete asset licensing documentation; it also left deployment-log inspection, secret-scanning settings and a full media privacy review unverified. This update records those findings honestly; it does not change the application's code, repository settings or deployment workflow.
