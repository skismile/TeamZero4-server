

  exports.dateFormetdd_mm_yyyy = async({ date:providedDate }) =>{
    const date = new Date(providedDate);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const year = date.getUTCFullYear();
    const formattedDateString = `${day}-${month}-${year}`;
    return  Promise.resolve(formattedDateString) ;
  }


  exports.currentDateGenerate = async({date:providedDate})=>{

    const date = new Date(providedDate);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    let dateString = await this.dateFormetdd_mm_yyyy({
      date: date,
    });

    let dateUnix = Math.floor( date.getTime() / 1000).toString()

    return Promise.resolve({date,dateString,dateUnix});
  }