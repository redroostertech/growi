/**
 * Utility for grid editor
 */
class GridEditorUtil {

  constructor() {
    // https://regex101.com/r/7BN2fR/11
    this.lineBeginPartOfGridRE = /^:::(\s.*)editable-row$/;
    this.lineEndPartOfGridRE = /^:::$/;
    this.mappingAllGridDivisionPatterns = [
      [
        [2, 10], [4, 8], [6, 6], [8, 4], [10, 2],
      ],
      [
        [2, 5, 5], [5, 2, 5], [5, 5, 2], [4, 4, 4], [3, 3, 6], [3, 6, 3], [6, 3, 3],
      ],
      [
        [2, 2, 4, 4], [4, 4, 2, 2], [2, 4, 2, 4], [4, 2, 4, 2], [3, 3, 3, 3], [2, 2, 2, 6], [6, 2, 2, 2],
      ],
    ];
    this.isInGridBlock = this.isInGridBlock.bind(this);
    this.replaceGridWithHtmlWithEditor = this.replaceGridWithHtmlWithEditor.bind(this);
  }

  /**
   * return boolean value whether the cursor position is in a grid block
   */
  isInGridBlock(editor) {
    const bog = this.getBog(editor);
    const eog = this.getEog(editor);
    return (JSON.stringify(bog) !== JSON.stringify(eog));
  }

  /**
   * return grid html where the cursor is
   */
  getGridHtml(editor) {
    const curPos = editor.getCursor();

    if (this.isInGridBlock(editor)) {
      const bog = this.getBog(editor);
      const eog = this.getEog(editor);
      // skip block begin sesion("::: editable-row")
      bog.line++;
      // skip block end sesion(":::")
      eog.line--;
      eog.ch = editor.getDoc().getLine(eog.line).length;
      return editor.getDoc().getRange(bog, eog);
    }
    return editor.getDoc().getLine(curPos.line);
  }

  /**
   * return the postion of the BOD(beginning of grid)
   */
  getBog(editor) {
    const curPos = editor.getCursor();
    const firstLine = editor.getDoc().firstLine();

    if (this.lineBeginPartOfGridRE.test(editor.getDoc().getLine(curPos.line))) {
      return { line: curPos.line, ch: 0 };
    }

    let line = curPos.line - 1;
    let isFound = false;
    for (; line >= firstLine; line--) {
      const strLine = editor.getDoc().getLine(line);
      if (this.lineBeginPartOfGridRE.test(strLine)) {
        isFound = true;
        break;
      }

      if (this.lineEndPartOfGridRE.test(strLine)) {
        isFound = false;
        break;
      }
    }

    if (!isFound) {
      return { line: curPos.line, ch: curPos.ch };
    }

    const bodLine = Math.max(firstLine, line);
    return { line: bodLine, ch: 0 };
  }

  /**
   * return the postion of the EOD(end of grid)
   */
  getEog(editor) {
    const curPos = editor.getCursor();
    const lastLine = editor.getDoc().lastLine();

    if (this.lineEndPartOfGridRE.test(editor.getDoc().getLine(curPos.line))) {
      return { line: curPos.line, ch: editor.getDoc().getLine(curPos.line).length };
    }

    let line = curPos.line + 1;
    let isFound = false;
    for (; line <= lastLine; line++) {
      const strLine = editor.getDoc().getLine(line);
      if (this.lineEndPartOfGridRE.test(strLine)) {
        isFound = true;
        break;
      }

      if (this.lineBeginPartOfGridRE.test(strLine)) {
        isFound = false;
        break;
      }
    }

    if (!isFound) {
      return { line: curPos.line, ch: curPos.ch };
    }

    const eodLine = Math.min(line, lastLine);
    const lineLength = editor.getDoc().getLine(eodLine).length;
    return { line: eodLine, ch: lineLength };
  }

  replaceGridWithHtmlWithEditor(editor, grid) {
    const curPos = editor.getCursor();
    editor.getDoc().replaceRange(grid.toString(), this.getBog(editor), this.getEog(editor));
    editor.getDoc().setCursor(curPos.line + 1, 2);
  }

  convertRatiosAndSizeToHTML(ratioNumbers, responsiveSize) {
    const cols = ratioNumbers.map((ratioNumber, i) => {
      const className = `col${responsiveSize !== 'xs' ? `-${responsiveSize}` : ''}-${ratioNumber} bsGrid${i + 1}`;
      return `<div class="${className}"></div>`;
    });
    return cols.join('\n');
  }

}

// singleton pattern
const instance = new GridEditorUtil();
Object.freeze(instance);
export default instance;