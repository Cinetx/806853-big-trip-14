import AbstractView from './abstract';

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {

    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();

    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}


// 3. Теперь нужно реализовать перерисовку формы редактирования после взаимодействия с пользователем:

//  - при смене типа точки маршрута нужно показать соответствующий типу набор дополнительных опций;
//  - при выборе пункта назначения нужно показать новые описание и фотографии.
// Обратите внимание, что при смене дополнительных опций ранее выбранные
// пользователем значения не сохраняются,
// а ещё выбор дополнительных опций не влияет на стоимость,
// указанную в соответствующем поле ввода.

// 4. При перерисовке компонента все обработчики событий будут утеряны,
// поэтому их нужно будет навесить заново.

// Обратите внимание, что если вы не используете один и тот же компонент
// в качестве формы добавления и формы редактирования,
// вам нужно повторить поведение контролов и валидации для компонента формы добавления новой точки маршрута.

