import { observable, computed } from "mobx";

export default class MuseConfig {
  @observable x = 1.0; // 1.0 means 100%
  @observable noteFontFamily = "serif";
  @observable textFontFamily = "serif";
  @observable backgroundColor = "white";
  @observable textColor = "black";
  @observable showBorder = false;
  @observable twopage = false;

  @computed get noteHeight() {
    return this.x * 22;
  }
  @computed get noteWidth() {
    return this.x * 11;
  }
  @computed get noteFontSize() {
    return this.x * 22;
  }
  @computed get sigFontSize() {
    return this.x * 14;
  }
  @computed get trackGap() {
    return this.x * 10;
  }
  @computed get pointGap() {
    return this.x * 5;
  }
  @computed get tailPointGap() {
    return this.x * 8;
  }
  @computed get pointRound() {
    return this.x * 1.5;
  }
  @computed get pageWidth() {
    return this.x * 1000;
  }
  @computed get pageHeight() {
    return this.x * 1414;
  }
  @computed get pageMarginHorizontal() {
    return this.x * 100;
  }
  @computed get pageMarginVertical() {
    return this.x * 110;
  }
  @computed get pageGap() {
    return this.x * 4;
  }
  @computed get infoTitleFontSize() {
    return this.x * 34;
  }
  @computed get infoSubtitleFontSize() {
    return this.x * 22;
  }
  @computed get infoGap() {
    return this.x * 7;
  }
  @computed get infoFontSize() {
    return this.x * 20;
  }
  @computed get pageIndexFontSize() {
    return this.x * 20;
  }
  @computed get notationMargin() {
    return this.x * 1;
  }
}
