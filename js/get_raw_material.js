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
        
        
    }
    $("#raw_success").hide();
    $("#raw_error").hide();
    
   $("#raw_material_file").on('change',function(){
       console.log("inside the raw material");
       var file = this.files[0];
       var reader = new FileReader();
      reader.readAsText(file);
    if(file.name.trim() === "raw_material.csv")
    {
      $("#raw_error").hide();
      $("#error-message").hide();
      $("#raw_material_file").prop('disabled', true);
      if($("#raw_upload_file").hasClass("has-error"))
      {
        $("#raw_upload_file").removeClass("has-error");
      }
      $("#raw_upload_file").addClass("has-success");
      $("#raw_upload_file").addClass("has-feedback");
      $("#raw_success").show();
      
     reader.onload = function(progressEvent){
           file_data = this.result;
           
           file_data = $.csv.toObjects(file_data);
           console.log(file_data);
           createDiv();
           getValue();
       }
    }
    else{
      $("#raw_success").hide();
      if($("#raw_upload_file").hasClass("has-success"))
      {
        $("#raw_upload_file").removeClass("has-success");
      }
      $("#raw_upload_file").addClass("has-error");
      $("#raw_upload_file").addClass("has-feedback");
      $("#raw_error").show();
      $("#error-message").show();
      $("#error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
      
   });
});