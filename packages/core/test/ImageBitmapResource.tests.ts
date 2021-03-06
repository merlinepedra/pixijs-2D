import { BaseTexture, ImageBitmapResource } from '@pixi/core';
import sinon from 'sinon';
import { expect } from 'chai';

describe('ImageBitmapResource', () =>
{
    it('should create new dimension-less resource', async () =>
    {
        const canvas = document.createElement('canvas');

        const bitmap = await createImageBitmap(canvas);
        const resource = new ImageBitmapResource(bitmap);

        expect(resource.width).to.equal(canvas.width);
        expect(resource.height).to.equal(canvas.height);
        expect(resource.valid).to.be.true;

        resource.destroy();
    });

    it('should create new valid resource', async () =>
    {
        const canvas = document.createElement('canvas');

        canvas.width = 100;
        canvas.height = 200;

        const bitmap = await createImageBitmap(canvas);
        const resource = new ImageBitmapResource(bitmap);

        expect(resource.width).to.equal(100);
        expect(resource.height).to.equal(200);
        expect(resource.valid).to.be.true;

        resource.destroy();
    });

    it('should fire resize event on bind', async () =>
    {
        const canvas = document.createElement('canvas');
        const bitmap = await createImageBitmap(canvas);
        const resource = new ImageBitmapResource(bitmap);
        const baseTexture = { setRealSize: sinon.stub() };

        resource.bind(baseTexture as unknown as BaseTexture);

        expect(baseTexture.setRealSize.calledOnce).to.be.true;

        resource.unbind(baseTexture as unknown as BaseTexture);
        resource.destroy();
    });

    it('should fire manual update event', async () =>
    {
        const canvas = document.createElement('canvas');
        const bitmap = await createImageBitmap(canvas);
        const resource = new ImageBitmapResource(bitmap);
        const baseTexture = { update: sinon.stub() };

        resource.bind(baseTexture as unknown as BaseTexture);

        expect(baseTexture.update.called).to.be.false;

        resource.update();

        expect(baseTexture.update.calledOnce).to.be.true;

        resource.unbind(baseTexture as unknown as BaseTexture);
        resource.destroy();
    });
});
