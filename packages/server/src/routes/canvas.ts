import { Response } from 'fets';
import { router } from '../lib/server.js';
import { canvas } from '../lib/canvas.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
const CANVAS_PATH = '/canvas';
const UPDATE_PATH = '/update/:row/:col/:color';

router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler() {
    return Response.json(canvas);
  }
});

router.route({
  path: UPDATE_PATH,
  method: 'POST',
  handler(request: Request) {
    const rowIndex = request.params.row;
    const colIndex = request.params.col;
    // i had an unknown bug not letting me put the color in the body so this is a small alternative
    let newColor = request.params.color;

    let newCanvas = canvas;
    newCanvas[rowIndex][colIndex] = newColor;
    fs.writeFileSync(
      fileURLToPath(new URL('../lib/canvas.json', import.meta.url)),
      JSON.stringify(newCanvas),
      'utf8'
    );
  }
});
