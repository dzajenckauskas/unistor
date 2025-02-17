import {useRef} from "react";

export default function Costs({order, setorder}) {
   const inp1 = useRef();
   const inp2 = useRef();

   function savenewitem() {
      let obj = {
         created: Date.now(),
         service: inp1.current.value,
         price: inp2.current.value,
      };
      let c = {...order};

      if (order?.state?.customOrders) {
         order.state.customOrders.push(obj);
      } else {
         order.state.customOrders = [obj];
      }
      setorder(c);
      inp1.current.value = "";
      inp2.current.value = "";
   }

   function editItem(id, pos, value) {
      let c = {...order};
      for (const item of c.state.customOrders) {
         if (item.created === id) {
            item[pos] = value;
            break;
         }
      }
      setorder(c);
   }

   return (
      <section className="ordereditcustomitemwrp">
         <strong>Add additional service</strong>
         <p className="additionaservicesubtitle">
            {` For example "Export pack", cost will be added on the final
         bill`}
         </p>

         <div className="ordereditcustomitemsmappedwrp">
            <div className="ordereditcustomitemsmappednavbarcustomorders">
               <p>Service:</p>
               <p>Price:</p>
            </div>
            <div className="ordereditcustomitemmappedliner">
               <input
                  ref={inp1}
                  type="text"
                  className="classname"
                  required
               />
               <input
                  ref={inp2}
                  type="text"
                  className="classname"
                  required
               />

               <button onClick={savenewitem}> Add </button>
            </div>
            <p className="ordereditcustomitemssplitter">
               <strong>List of additional service:</strong>
            </p>
            {order?.state?.customOrders?.map((el, i) => {
               return (
                  <div
                     className="ordereditcustomitemmappedliner"
                     key={el.created}>
                     <p>{el.service}</p>
                     <p> £{el.price}</p>
                     <button
                        className="additionalcostsdeleteitembutton"
                        onMouseLeave={(e) => {
                           e.target.textContent = "\u2715";
                        }}
                        onClick={(e) => {
                           if (e.target.textContent !== "Sure?") {
                              e.target.textContent = "Sure?";
                           } else {
                              let c = {...order};
                              let f = c.state.customOrders.filter(
                                 (it) => {
                                    return it.created !== el.created;
                                 }
                              );
                              c.state.customOrders = f;
                              setorder(c);
                           }
                        }}>
                        &#x2715;
                     </button>
                  </div>
               );
            })}
         </div>
      </section>
   );
}
