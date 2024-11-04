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

  const keywords = [
    `@${options.scope}/${options.name}`,
      options.scope,
      options.name
  ]

  if(options.keywords) {
    keywords.push(...options.keywords.split(',').map(e=>e.trim()))
  }

  const modifiedOptions = {
    ...options,
    keywords
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
