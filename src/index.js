document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
});

function fetchDogs() {
  fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((json) => json.forEach((dog) => renderdog(dog)));
}

function renderdog(dog) {
  const tableRow = document.createElement("tr");
  const tableBody = document.querySelector("#table-body");
  const buttonBox = document.createElement("td");
  const button = document.createElement("button");
  button.innerText = "Edit";
  tableRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td>`;

  buttonBox.append(button);
  tableRow.append(buttonBox);
  tableBody.append(tableRow);

  button.addEventListener("click", (e) => {
    editDog(dog, e, tableRow, buttonBox);
  });
}

function editDog(dog, e, tableRow, buttonBox) {
  console.log(dog);
  const form = document.querySelector("#dog-form");
  form.name.value = dog.name;
  form.breed.value = dog.breed;
  form.sex.value = dog.sex;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.name.value, dog);
    let data = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value,
    };
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((json) => {
          tableRow.innerHTML = `<td>${json.name}</td> <td>${json.breed}</td> <td>${json.sex}</td>`;
          tableRow.append(buttonBox);
        })
      )
      .then(form.reset());
  });
}
