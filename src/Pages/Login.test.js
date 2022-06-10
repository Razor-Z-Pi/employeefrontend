const login = require("./LoginSS");

test("Успешный пройденный тест", () => {
  expect(login("admin","12345").toBe(true));
});


/*
*   const employee = require("./TableEmployee");

  test("Успешный пройденный тест", () => {
    expect(employee("Ivan","Ivanov", "Programmer").toBe(true));
  });*/


