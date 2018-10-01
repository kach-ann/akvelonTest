import "./invoices.css";
import create from "../create-invoices/create-invoices";

class Invoices {
  showInvoices(invoices) {
    const tableOfInvoices = document.getElementById("invoices");
    for (let i = 0; i < invoices.length; i++) {
      let tr = document.createElement("tr");
      tableOfInvoices.appendChild(tr);
      const create = document.createElement("td");
      const number = document.createElement("td");
      const supply = document.createElement("td");
      const comment = document.createElement("td");

      const edit = document.createElement("td");
      const del = document.createElement("div");
      const ed = document.createElement("div");

      tr.appendChild(create);
      tr.appendChild(number);
      tr.appendChild(supply);
      tr.appendChild(comment);
      edit.appendChild(del);
      edit.appendChild(ed);
      tr.appendChild(edit);

      del.dataset.invoiceId = invoices[i].id;
      ed.dataset.invoiceId = invoices[i].id;

      create.innerHTML = invoices[i].date_created;
      number.innerHTML = invoices[i].number;
      supply.innerHTML = invoices[i].date_supplied;
      comment.innerHTML = invoices[i].comment;
      del.innerHTML = "delete";
      ed.innerHTML = "edit";

      del.addEventListener("click", () => {
        fetch("http://localhost:3000/invoices/" + del.dataset.invoiceId, {
          method: "delete"
        }).then(this.render.bind(this));
      });
    }
  }

  render() {
    fetch("http://localhost:3000/invoices/")
      .then(function(response) {
        return response.json();
      })
      .then(invoices => {
        this.showInvoices(invoices);
      })
      .catch(alert);

    document.title = "invoices";
    let allPage = document.getElementById("app");
    allPage.innerHTML = render();

    let addBtn = document.getElementById("addInvoice");
    addBtn.addEventListener("click", () => {
      create.render();
    });
  }
}

const invoices = new Invoices();
export default invoices;

function render() {
  return `
     <section>
        <div class="invoices-container">
             <div class="header-of-title">  
                  <h1 class="line">Invoices</h1>
             </div>
             <div class="container-value"> 
                <div class="add-new-invoices">
                    <p>Action</p>
                    <button id="addInvoice">Add new</button>
                </div>
                <div class="create-invoices">
                    <p>Invoices</p>
                    <table id="invoices" class="invoices">
                        <tr>
                            <th>Create</th>
                            <th>№</th>
                            <th>Supply</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>
             </div>
        </div>
     </section>
     
  `;
}
