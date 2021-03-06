let employeePayrollDataList;

window.addEventListener('DOMContentLoaded', (event) => {
  employeePayrollDataList = getEmployeePayrollDataFromStorage();
  document.querySelector('.emp-count').textContent = employeePayrollDataList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
};

const createInnerHtml = () => {

  const headerHtml = 
    ` <th></th>
      <th>Name</th>
      <th>Gender</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Start Date</th>
      <th>Actions</th>`;

  if (employeePayrollDataList.length == 0)
    return;

  let innerHtml = `${headerHtml}`;

  for (const employeePayrollData of employeePayrollDataList) {

    innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" src="${employeePayrollData._profilePic}" alt="profile_img-1"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDepartmentHtml(employeePayrollData._department)}</td>
        
        <td>${employeePayrollData._salary}</td>
        <td>${stringifyDate(employeePayrollData._startDate)}</td>
        <td>
          <img id="${employeePayrollData._id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" onclick="remove(this)">
          <img id="${employeePayrollData._id}" src="../assets/icons/create-black-18dp.svg" alt="edit" onclick="update(this)">
        </td>
      </tr>`;
  }
  document.querySelector('#table_display').innerHTML = innerHtml;
};

const getDepartmentHtml = (departmentList) => {
  let departmentHtml = '';
  for (const department of departmentList) {
    departmentHtml = `${departmentHtml} <div class='dept-label'>${department}</div>`
  }
  return departmentHtml
};

const remove = (node) => {
  let employeePayrollData = employeePayrollDataList.find(employeeData => employeeData._id == node._id);
  if (!employeePayrollData)
    return;

  const index = employeePayrollDataList
                .map(employeeData => employeeData._id)
                .indexOf(employeePayrollData._id);
  employeePayrollDataList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollDataList));
  document.querySelector(".emp-count").textContent = employeePayrollDataList.length;
  createInnerHtml();
};