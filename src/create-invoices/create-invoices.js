import "./create-invoices.css";
import invoices from "../invoices/invoices";

class Create {
  render() {
    document.title = "invoices";
    let allPage = document.getElementById("app");
    allPage.innerHTML = render();

    let saveBtn = document.getElementById("saveForm");
    saveBtn.addEventListener("submit", () => {
      this.saveInvoice();
    });
  }

  saveInvoice() {
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
                <form id="saveForm">
                    <div class="form-part">
                        <div class="">
                            <div>
                                <div>Number</div>
                                <input type="text" name="number" placeholder="000000" required min="0">
                            </div>
                            <div>
                                <div>Invoice Date</div>
                                <input type="date" name="date" required>
                            </div>
                        </div>
                    </div>
                    <div class="form-part">
                        <div>Supply Date</div>
                        <input type="date" name="supplyDate" value="Select Date" required>
                    </div>
                    <div class="form-part">
                        <div>Comment</div>
                        <textarea name="comment" rows="3" cols="145" required minlength="4"></textarea>
                    </div>
                    <div class="form-part"><button type="submit">Save</button></div>
                    
                </form>
             </div>
             
        </div>
     </section>
     
  `;
}
