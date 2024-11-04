import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { reactTsLibGenerator } from './generator';
import { ReactTsLibGeneratorSchema } from './schema';

describe('react-ts-lib generator', () => {
  let tree: Tree;
  const options: ReactTsLibGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await reactTsLibGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
