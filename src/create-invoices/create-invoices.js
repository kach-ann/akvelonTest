import "./create-invoices.css";
import invoices from "../invoices/invoices";

class Create {
  render(invoiceId) {
    document.title = "invoices";
    let allPage = document.getElementById("app");
    allPage.innerHTML = render();

    if (invoiceId) {
      fetch("http://localhost:3000/invoices/" + invoiceId, {
        method: "get"
      })
        .then(function(response) {
          return response.json();
        })
        .then(invoice => {
          document.querySelector("input[name='number']").value = invoice.number;
          document.querySelector("input[name='date']").value =
            invoice.date_created;
          document.querySelector("input[name='supplyDate']").value =
            invoice.date_supplied;
          document.querySelector("textarea[name='comment']").value =
            invoice.comment;
        });
    }

    let saveBtn = document.getElementById("saveForm");
    saveBtn.addEventListener("submit", () => {
      this.saveInvoice(invoiceId);
    });
  }

  saveInvoice(invoiceId) {
    let number = document.querySelector("input[name='number']").value;
    let invoiceDate = document.querySelector("input[name='date']").value;
    let supplyDate = document.querySelector("input[name='supplyDate']").value;
    let comment = document.querySelector("textarea[name='comment']").value;

    let newInvoice = {
      number: +number,
      date_created: invoiceDate,
      date_supplied: supplyDate,
      comment: comment
    };

    if (invoiceId) {
      fetch("http://localhost:3000/invoices/" + invoiceId, {
        method: "put",
        body: JSON.stringify(newInvoice),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(function(response) {
        console.log(response.json());
      });
    } else {
      fetch("http://localhost:3000/invoices/", {
        method: "post",
        body: JSON.stringify(newInvoice),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(function(response) {
        console.log(response.json());
      });
    }
  }
}

const create = new Create();
export default create;

function render() {
  return `
     <section>
        <div class="create-container">
             <div class="header-of-title">  
                  <h1 class="line">Create Invoices</h1>
             </div>
             <div class="form-value">
                  <form id="saveForm" class="form">
                  
                  <div class="row">
                      <div class="col">
                           <label for="number">Number</label>
                           <input id="number" type="text" name="number" placeholder="000000" required min="0">
                      </div>
                      <div class="col">
                          <label for="date">Invoice Date</label>
                          <input id="date" type="date" name="date" required>
                      </div>
                  </div>
                  
                  <div class="second-row">
                      <div class="col">
                          <label for="supplyDate">Supply Date</label>
                          <input id="supplyDate" type="date" name="supplyDate" value="Select Date" required>
                      </div>
                  </div>
                  
                  <div class="comment-row">
                       <label>Comment</label>
                       <textarea name="comment" rows="3" cols="145" required minlength="4"></textarea>
                  </div>

                  <div class="form-part"><button type="submit">Save</button></div>
                      
                  </form>
             </div>
             
        </div>
     </section>
     
  `;
}
