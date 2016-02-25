import {bootstrap} from 'angular2/platform/browser'
import {enableProdMode, Component} from 'angular2/core'
enableProdMode()

@Component({
    selector: 'app',
    templateUrl: 'app/words.html'
})
export class AppComponent {
  private words = WORDS.slice(0);
  public word = '';
  constructor() {
        this.addWord('word');
  }
  inputText(event:any) {
    this.word = event.target.value
    this.addWord(event.target.value)
  }
  private addWord(newWord) {
    let newWords = WORDS.slice(0)
    newWords.push(newWord)
    newWords.push(newWord)
    newWords.push(newWord)
    newWords.push(newWord)
    var currentIndex = newWords.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newWords[currentIndex];
      newWords[currentIndex] = newWords[randomIndex];
      newWords[randomIndex] = temporaryValue;
    }
    this.words = newWords
  }
  public getWords() {
    return this.words;
  }
  getWordLetters() {
    return this.word.split("");
  }
  public getWord() {
    return this.word;
  }
  ngAfterViewInit() {
    // viewChild is updated after the view has been initialized
    console.log('ngAfterViewInit: ');
  }
}

var WORDS: string[] = ["The", "and", "on", "are", "A", "This", "is", "my", "I", "she", "he", "we", "me"];

bootstrap(AppComponent)
