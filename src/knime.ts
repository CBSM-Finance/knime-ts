import { exec } from 'child_process';

export class Knime {
  constructor(private knimePath: string, private workspacePath: string) {}

  /**
   * Run a KNIME workflow.
   * @param workflowName workflow to run
   * @param addditionalArgs override existing args or add new ones
   */
  run({
    workflowName,
    addditionalArgs,
    callback,
  }: {
    workflowName: string;
    addditionalArgs: string[];
    callback: (error: Error, stdout: string | Buffer, stderr: string | Buffer) => void;
  }) {
    const workflowFullPath = this.workspacePath + workflowName;
    const args = [
      `-nosplash`,
      `-consoleLog`,
      `-reset`,
      `-nosplash`,
      `-application org.knime.product.KNIME_BATCH_APPLICATION`,
      `-workflowDir="${workflowFullPath}"`,
      ...addditionalArgs,
    ];
    exec(
      `knime.exe ${args.join(' ')}`,
      {
        cwd: this.knimePath,
        windowsHide: true,
      },
      callback,
    );
  }
}
