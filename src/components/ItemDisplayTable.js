export default function ItemDisplayTable(){

<<<<<<< Updated upstream
    return(<></>)
=======

export default function ItemDisplayTable(id){

    const [items, setItems] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const [potlukk, setPotlukk] = useState({});
    const [showButton, setShowButton] = useState(true)
    const [itemRow, setItemRow] = useState({id:0, name:'', provider:'', status:''})

    //Get data from backend
    async function getItemsForPotlukk(){
        const response = await fetch(`http://localhost:8080/potlukks/${id.value}/items`);
        const body = await response.json();
        setItems(body)
        console.log(body)
    }
    async function getPotlukk(){
        const response = await fetch(`http://localhost:8080/potlukks/${id.value}`);
        const body = await response.json();
        setPotlukk(body)
    }
    useEffect(()=>{
        getItemsForPotlukk();
        getPotlukk();
    },[]);

    // States for adding an item and signing up for one
    const [itemID, setItemID] = useState("");
    const [item, setItem] = useState("");
    const [supplier, setSupplier] = useState("");

    // Set state values
    function updateItemsetItem(event){
        setItem(event.target.value);
    }
    function updateProvider(event){
        setSupplier(event.target.value);
    }

    function addItemInput(){
        let component;
        if(userInfo){
            component = <>
                <label htmlFor="item">Item</label>
                <input onChange={updateItemsetItem} name="item" value={item}/>
                setSupplier(userInfo.username)
                <button onClick={addItem}>Add</button>
            </>
        }else{
            component = <>
                <label htmlFor="item">Item</label>
                <input onChange={updateItemsetItem} type="text" value={item}/>
                <label htmlFor="Provider">Provider</label>
                <input onChange={updateProvider} value={supplier}/>
                <button onClick={addItem}>Add</button>
            </>
        }
        return component;
    }
    async function addItem(){
        const itemObj = {id:0, name:item, supplier:supplier, status:"FULFILLED", potlukkID:id.value}

        await fetch("http://localhost:8080/items",{
            body:JSON.stringify(itemObj),
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }     
        });
        
        //dont do this
        getItemsForPotlukk()
    }

    function SignUpInput(item_id){
        if(userInfo){
            setItemID(item_id);
            setSupplier(userInfo.username);
            signUp();
        }
        else{
            setItemID(item_id);
            <>
                <label htmlFor="Provider">Provider</label>
                <input onChange={updateProvider} name="provider" text="provider" placeholder="Name"/>
                <button onClick={signUp}>Sign Up!</button>
            </>
        }
    }

    async function signUp(){
        const item = {id:itemID, supplier:supplier, status:"FULFILLED", potlukkID:id}
        await fetch(`http://localhost:8080/items/${itemID}`,{
            body:JSON.stringify(item),
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }     
        });

    }


    // Map items to table rows to display
    const itemRows = items.map(item =>
        <tr key={item.id}>
            <td>{item.name}</td>
            <td><NameOrButton supplier={item.supplier} item_id={item.id}/></td>
            <td>{item.status}</td>
            <td><DeleteItem/></td>
        </tr>)


    function NameOrButton(args){ // decide if we display a username or a sign up option
        let display;
        if(args.supplier){
            display = <>{args.supplier}</>;
        }else{
            display = <button onClick={() => SignUpInput(args.item_id)}>Sign Up!</button>
        }
        return display
    }
    function DeleteItem(){ // Give option to delete item iff current user is potlukk owner
        let deleteButton;
        if(userInfo){
            if(potlukk.hostID===userInfo.id){
                deleteButton = <button>Delete</button>
            }
            else{
                deleteButton = ""
            }
        }

        return deleteButton
    }

    return(<>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Supplier</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {itemRows}
            </tbody>
        </table>
        {(showButton) ? <button onClick={() => setShowButton(false)}>Add Item</button> : addItemInput() }
        
    </>)
>>>>>>> Stashed changes
}