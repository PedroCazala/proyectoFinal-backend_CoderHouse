export const newId = (products)=>{
    let arraysIds = products.map(prod =>prod.id).sort((a,b)=>a-b)
    // console.log('arraysIds',arraysIds);
    let generatedId=0;
    for(let i=1 ; i <= products.length; i++){
        const id = arraysIds.find(element => element == i)
        if(!id){
            generatedId =i
        }
    }
    return generatedId
}