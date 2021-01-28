import { EditorType, HookCallback } from '@t/editor';
import { Emitter } from '@t/event';

export function addDefaultImageBlobHook(eventEmitter: Emitter) {
  eventEmitter.listen('addImageBlobHook', (blob: File, callback: HookCallback) => {
    const reader = new FileReader();

    reader.onload = (event) => callback(event.target!.result as string);
    reader.readAsDataURL(blob);
  });
}

export function emitImageBlobHook(
  eventEmitter: Emitter,
  editorType: EditorType,
  blob: File,
  type: string
) {
  const hook: HookCallback = (imageUrl, altText) => {
    eventEmitter.emit(
      'command',
      { type: editorType, command: 'addImage' },
      {
        imageUrl,
        altText: altText || blob.name || 'image',
      }
    );
  };

  eventEmitter.emit('addImageBlobHook', blob, hook, type);
}
