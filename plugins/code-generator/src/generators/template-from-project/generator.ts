import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import * as fs from 'fs-extra';
import { TemplateFromProjectGeneratorSchema } from './schema';


const copyTemplateFiles=async(
  sourceDir: string,
  targetDir: string,
  skipDirs: string[] = [],
  skipFiles: string[] = []
)=> {
  try {

    // Ensure the target directory exists
    await fs.ensureDir(targetDir);

    // Recursively read through sourceDir
    const items = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const item of items) {
      const sourcePath = path.join(sourceDir, item.name);
      const targetPath = path.join(targetDir, item.name + '.template');

      if (item.isDirectory()) {
        // Skip directories in skipDirs
        if (skipDirs.includes(item.name)) continue;

        // Recursively copy subdirectories
        await copyTemplateFiles(sourcePath, path.join(targetDir, item.name), skipDirs, skipFiles);
      } else if (item.isFile()) {
        // Skip files in skipFiles
        if (skipFiles.includes(item.name)) continue;

        // Copy file and append '.template'
        await fs.copy(sourcePath, targetPath);
      }
    }
  } catch (error) {
    console.error('Error copying template files:', error);
  }
}



export async function templateFromProjectGenerator(
  tree: Tree,
  options: TemplateFromProjectGeneratorSchema
) {
   
  const skipDirs = ["node_modules", "build", "dist"]
  if(options.skipDirectories){
    skipDirs.push(...options.skipDirectories.split(',').map(e=>e.trim()))
  }
  const skipFiles = []

  if(options.skipFiles){
    skipFiles.push(...options.skipFiles.split(',').map(e=>e.trim()))
  }
   
  await copyTemplateFiles( options.sourceDirectory,options.targetDirectory,skipDirs, skipFiles)
  await formatFiles(tree);
}

export default templateFromProjectGenerator;
