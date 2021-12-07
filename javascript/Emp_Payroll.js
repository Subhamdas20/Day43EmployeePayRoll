window.onload = function () {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = document.querySelector('#salary').value;
    salary.addEventListener('input', function () {
      output.textContent = document.querySelector('#salary').value;
    });
  }