import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { TsLibGeneratorSchema } from './schema';

export async function tsLibGenerator(
  tree: Tree,
  options: TsLibGeneratorSchema
) {

  const keywords = [
    `@${options.scope}/${options.name}`,
      options.scope,
      options.name
  ]

  if(options.keywords) {
    keywords.push(...options.keywords.split(',').map(e=>e.trim()))
  }

  const formats = options.formats ==='both' ? ['es', 'cjs'] : [options.formats]

  const modifiedOptions = {
    ...options,
    keywords,
    formats,
    hasCjs: formats.includes('cjs'),
    hasEs: formats.includes('es')
  }

  const projectRoot = `${options.parentDir}/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, modifiedOptions);
  await formatFiles(tree);
}

export default tsLibGenerator;
