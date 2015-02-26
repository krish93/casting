
$("document").ready(function(){
    var file_data;
    var recovery = [],cost = [],material = [];
    function createDiv()
    {
      $(".get_raw").remove();
        var start_div="<div class='get_raw'";
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
    function capitalizeFirstString(string)
    {
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    function changeName(value)
    {
      if(value.indexOf("sg_iron")>=0)
      {
        value=value.replace("sg_iron","SG Iron");
      }
      else if(value.indexOf("sand_cost")>=0)
      {
        value=value.replace("sand_cost","Green Sand");
      }
      else if(value.indexOf("cold_cost")>=0)
      {
        value=value.replace("cold_cost","Cold Box Core");
      }
      else if(value === "gray_treatment_cost")
      {
        value=value.replace("gray_treatment_cost","Grey Iron Treatment");
      }
      else if(value.indexOf("treatment_cost")>=0)
      {
        value=value.replace("treatment_cost","SG Iron Treatment");
      }
      else if(value.indexOf("foundry")>=0)
      {
        value=value.replace("foundry","Charge Mix");
      }
      else if(value.indexOf("boring")>=0)
      {
        value=value.replace("boring","Charge Mix");
      }
      else if(value.indexOf("crca")>=0)
      {
        value=value.replace("crca","Charge Mix")
      }
      else if(value.indexOf("pig_iron")>=0)
      {
        value=value.replace("pig_iron","Charge Mix");
      }
      else if(value === "gray_iron" )
      {
        value=value.replace("gray_iron","Grey Iron");
      }
      else if(value === "ed_coating" )
      {
        value=value.replace("ed_coating","Surface Treatment");
      }
      return value;
    }
    function changeMaterial(value)
    {
      if(value==="crca")
      {
        value=value.toUpperCase();
      }
      else if(value==="foundry")
      {
        value=value.replace("foundry","Foundry R/R");
      }
      else if(value==="boring")
      {
        value=value.replace("boring","Borings");
      }
      return value;
    }
    function separateRawMaterialDetails(file_data)
    {
      $("#raw_table").append("<tr><th>Sl.No</th><th>Type</th><th>Material</th><th>Cost (Rs/kg)</th></tr>");
      $("#ed_coat_table").append("<tr><th>Sl.No</th><th>Type</th><th>Process</th><th>Cost (Rs/m<sup>2</sup>)</th></tr>");
        $.each(file_data,function(key,value)
        {
          var changed_type=changeName(value.type);
          var changed_material=changeMaterial(value.material.replace("_"," "));
          if(value.type!="" && parseInt(key+1) < parseInt(file_data.length))
          {
            $("#raw_table").append("<tr><td style='text-align:center'>"+parseInt(key+1)+"</td><td>"+changed_type+"</td><td>"+changed_material+"</td><td>"+value.cost+"</td></tr>");
          }
          else
          {
            $("#ed_coat_table").append("<tr><td style='text-align:center'>"+parseInt(1)+"</td><td>"+changed_type+"</td><td>"+changed_material+"</td><td>"+value.cost+"</td></tr>"); 
          }
        });
    }
    $("#raw_success").hide();
    
    $("#raw_error").hide();
    
   $("#raw_material_file").on('change',function(){
     //  console.log("inside the raw material");
       var file = this.files[0];
       var reader = new FileReader();
      reader.readAsText(file);
      var file_name=file.name.replace(/_/g," ");
      file_name=file_name.toUpperCase();
      file_name=file_name.split(".");
      $("#table_name").text(file_name[0]);
    if(file.name.trim().indexOf("raw_material")>=0)
    {
      $("#raw_error").hide();
      $("#error-message").hide();
    //  $("#raw_material_file").prop('disabled', true);
      if($("#raw_upload_file").hasClass("has-error"))
      {
        $("#raw_upload_file").removeClass("has-error");
      }
      $("#raw_upload_file").addClass("has-success");
      $("#raw_upload_file").addClass("has-feedback");
      $("#raw_success").show();
      
    reader.onload = function(progressEvent){
           file_data = this.result;
           var main_file_data=this.result;
           //var temp_data = $("#raw_material_content").html();
           //file_data = file_data.replace(/\"/g,'');
           file_data = $.csv.toObjects(file_data);
  //   console.log(file_data); 
          var lines=main_file_data.split("\n"),output=[],i;
            /*for(i=0;i<lines.length-1;i++)
            {
              if(i==0)
              {
                output.push("<tr><th>"+lines[i].slice(0,-1).split(",").join("</th><th>")+"</th><tr>")
              }
              else
              {
                output.push("<tr><td>"+lines[i].slice(0,-1).split(",").join("</td><td>")+"</td><tr>")
              }
            }
          $("#raw_table").append(output.join(""));
          for(i=4;i>1;i--)
          {
            jQuery.each($("#raw_table tr"), function() { 
            $(this).children(":eq("+parseInt(i)+")").after($(this).children(":eq("+parseInt(i-1)+")"));
        });
          }*/
          separateRawMaterialDetails(file_data);
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