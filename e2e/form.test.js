const puppeteer = require('puppeteer');

describe('Credit Card Validator form', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Важно для работы в CI режиме, как Appveyor
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Настройки безопасности для CI режима
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Ввод валидного номера карты', async () => {
    await page.goto('http://localhost:9000'); // Убедитесь, что сервер запущен

    // Заполнение формы валидным номером карты
    await page.type('.input', '4111111111111111'); // Пример валидного номера Visa
    await page.click('.submit');
    await page.waitForSelector('.valid'); // Проверка на добавление класса .valid

    const validClassExists = await page.evaluate(() => document.querySelector('.input').classList.contains('valid'));
    expect(validClassExists).toBe(true);
  });

  test('Ввод невалидного номера карты', async () => {
    await page.goto('http://localhost:9000'); // Убедитесь, что сервер запущен

    // Заполнение формы невалидным номером карты
    await page.type('.input', '1234567890123456'); // Пример невалидного номера
    await page.click('.submit');
    await page.waitForFunction(() => document.querySelector('.icon').textContent === 'Error'); // Проверка на текст иконки

    const iconText = await page.evaluate(() => document.querySelector('.icon').textContent);
    expect(iconText).toBe('Error');
  });
});
