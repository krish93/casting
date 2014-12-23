$("document").ready(function(){
    var file_data;
    var recovery = [],cost = [],material = [];
    function createDiv()
    {
        var start_div="<div";
        var end_div="</div>";
        $.each(file_data,function(key,value)
        {
            $("#get_raw_material").append(start_div+" data-material='"+value.material+"' data-recovery='"+value.recovery+"' data-cost='"+value.cost+"' data-type='"+value.type+"' >"+end_div);
        });
    } 
    function getValue()
    {
        var rec = $('div [data-type="sg_iron"]');
        $.each(rec,function(key,value){
        recovery.push($(this).data("recovery"));
        material.push($(this).data("material"));
        cost.push($(this).data("cost"));
        });
        console.log(cost);
        console.log(recovery);
        console.log(material);
        
    }
   $("#raw_material_file").on('change',function(){
       console.log("inside the raw material");
       var file = this.files[0];
       
       var reader = new FileReader();
       reader.onload = function(progressEvent){
           file_data = this.result;
           
           file_data = $.csv.toObjects(file_data);
           console.log(file_data);
           createDiv();
           getValue();
       }
       reader.readAsText(file);
      
   });
});