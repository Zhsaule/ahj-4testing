import { luhnAlgorithmCheck, cardSystem } from './validators';

export default class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <div class="card-form-widget">
            <h3>Check your credit card number</h3>
            <ul class="cards list-unstyled">
              <li><span class="card mir" title="Mir">Mir</span></li>
              <li><span class="card visa" title="Visa">Visa</span></li>
              <li><span class="card master" title="Mastercard">Mastercard</span></li>
              <li><span class="card amex" title="American Express">American Express</span></li>
              <li><span class="card discover" title="Discover">Discover</span></li>
              <li><span class="card jcb" title="JCB">JCB</span></li>
              <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
            </ul>
            <form class="card-form">
              <div class="form-control">
                <input type="text" id="input" class="input" placeholder="Credit Card Number">
                <button type="submit" class="submit">Click to Validate</button>
              </div>
            </form>
            <h3 class="card-form-result">
              Luhn Algorithm Check
              <span class="icon" style="color: green; display: none;"></span>
            </h3> 
        </div>
    `;
  }

  static get iconSelector() {
    return '.icon';
  }

  static get resultSelector() {
    return '.card-form-result';
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get formSelector() {
    return '.card-form';
  }

  static get cardSelector() {
    return '.card';
  }

  static get cardsSelector() {
    return '.cards';
  }

  static get selector() {
    return '.card-form-widget';
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;

    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.icon = this.element.querySelector(CardFormWidget.iconSelector);
    this.result = this.element.querySelector(CardFormWidget.resultSelector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);
    this.form = this.element.querySelector(CardFormWidget.formSelector);
    this.card = this.element.querySelector(CardFormWidget.cardSelector);
    this.cards = this.element.querySelector(CardFormWidget.cardsSelector);

    this.element.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    // const value = this.input.value;
    const { value } = this.input;
    const resultLuhn = luhnAlgorithmCheck(value);
    const cardBrand = cardSystem(value);

    this.cards.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('cdisabled');
    });

    if (cardBrand !== undefined) {
      this.cards.querySelectorAll('.card').forEach((card) => {
        if (!card.classList.contains(cardBrand)) {
          card.classList.add('cdisabled');
        }
      });
    }

    if (resultLuhn) {
      this.input.classList.add('valid');
      this.icon.style.color = 'green';
      this.icon.style.display = 'inline-block';
      this.icon.textContent = 'Ok';
    }
    if (!resultLuhn) {
      this.input.classList.remove('valid');
      this.icon.style.color = 'red';
      this.icon.style.display = 'inline-block';
      this.icon.textContent = 'Error';
      this.input.value = '';
    }
  }
}
