import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { templateFromProjectGenerator } from './generator';
import { TemplateFromProjectGeneratorSchema } from './schema';

describe('template-from-project generator', () => {
  let tree: Tree;
  const options: TemplateFromProjectGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await templateFromProjectGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
