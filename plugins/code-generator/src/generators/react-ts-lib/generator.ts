import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { ReactTsLibGeneratorSchema } from './schema';

export async function reactTsLibGenerator(
  tree: Tree,
  options: ReactTsLibGeneratorSchema
) {

  const modifiedOptions = {
    ...options,
    keywords:  [
      `@${options.scope}/${options.name}`,
      options.scope,
      options.name,
      ...options.keywords?.split(',').map(e=>e.trim())
    ]
  }

  const projectRoot = `${options.parentDir}/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, modifiedOptions);
  await formatFiles(tree);
}

export default reactTsLibGenerator;
