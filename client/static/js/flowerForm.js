import { createElement } from './utils.js'
import { addBaseLayout } from './base.js'
import { navigationOptions } from './config.js'


function ImageSlider(images) {
  const leftArrow = createElement('img', 'arrow')
  leftArrow.src = '/img/arrow.svg'

  const rightArrow = createElement('img', 'arrow mirrored')
  rightArrow.src = '/img/arrow.svg'

  const mainImage = createElement('img', 'main-image')
  mainImage.src = images[0].path

  const mainImageWrapper = createElement('div', 'main-image-wrapper')
  mainImageWrapper.appendChild(leftArrow)
  mainImageWrapper.appendChild(mainImage)
  mainImageWrapper.appendChild(rightArrow)

  const imagesSlider = createElement('div', 'slider-images')
  images.forEach(image => {
    const imageNode = createElement('img', 'slider-image')
    imageNode.src = image.path
    imagesSlider.appendChild(imageNode)
  })

  const addImageButton = createElement('div', 'slider-image slider-images-button')
  addImageButton.textContent = 'Додати зображення'

  imagesSlider.appendChild(addImageButton)

  const node = createElement('div', 'slider')
  node.appendChild(mainImageWrapper)
  node.appendChild(imagesSlider)

  return node
}


function FlowerFormField(placeholder = '') {
  const node = createElement('input', 'form-field')
  node.placeholder = placeholder

  return node
}


function FlowerForm() {
  const name = FlowerFormField('Назва')

  const color = FlowerFormField('Колір')

  const price = FlowerFormField('Ціна')

  const fields = createElement('div', 'form-fields')
  fields.appendChild(name)
  fields.appendChild(color)
  fields.appendChild(price)

  const submitButton = createElement('button', 'form-button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Зберегти'

  const node = createElement('form')
  node.appendChild(fields)
  node.appendChild(submitButton)

  return node
}


function FlowerFormMain() {
  const slider = ImageSlider([
    {
      'path': '/img/flower.jpg'
    },
    {
      'path': '/img/flower.jpg'
    },
    {
      'path': '/img/flower.jpg'
    },
  ])

  const form = FlowerForm()

  const node = createElement('main')
  node.appendChild(slider)
  node.appendChild(form)

  return node
}


addBaseLayout(document.body, undefined)

document.querySelector('main').replaceWith(FlowerFormMain())