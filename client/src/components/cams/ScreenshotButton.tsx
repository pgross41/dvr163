import { Button } from '@material-ui/core';
import Photo from '@material-ui/icons/Photo';
import React from 'react';

interface Props {
  getImg: () => HTMLImageElement | null;
  title?: string;
}

const save = (img: HTMLImageElement | null, title?: string) => {
  if (!img) {
    return;
  }

  // Convert to base64
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  if (ctx !== null) {
    ctx.drawImage(img, 0, 0);
  }

  // Create/click link to download
  const time = new Date()
    .toISOString()
    .substr(0, 19)
    .replace(/:/g, '-');
  const name = (title || 'Screenshot').replace(/ /g, '-');
  const a = document.createElement('a');
  a.href = c.toDataURL('image/png');
  a.target = '_blank';
  a.download = `${name}-${time}.png`;
  a.click();
};

export default function ScreenshotButton(props: Props) {
  return (
    <Button title="Save Screenshot" onClick={() => save(props.getImg(), props.title)}>
      <Photo />
    </Button>
  );
}
