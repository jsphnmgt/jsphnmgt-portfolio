import { useState } from "react";
import { selectPreviewColor } from "../../utilities/previewColor";

const paletteTokens = ["--color-mint", "--color-sage", "--color-lavender", "--color-periwinkle"];

export default function ProjectPreview({ image, title }) {
  const [background, setBackground] = useState("--color-sage");
  const chooseBackground = event => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.drawImage(event.currentTarget, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const rootStyle = getComputedStyle(document.documentElement);
      const palette = paletteTokens.map(token => {
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = rootStyle.getPropertyValue(token).trim();
        context.fillRect(0, 0, 1, 1);
        return { token, rgb: [...context.getImageData(0, 0, 1, 1).data].slice(0, 3) };
      });
      setBackground(selectPreviewColor(pixels, palette));
    } catch {
      setBackground("--color-sage");
    }
  };
  return <div className="project-detail-preview" style={{ "--preview-background": `var(${background})` }}>
    <div className="project-preview-frame"><img src={image} alt={title + " preview"} onLoad={chooseBackground} /></div>
  </div>;
}
