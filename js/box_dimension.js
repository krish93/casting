$("document").ready(function () {
    
  var file_lines = [], row_index, length_index, breadth_index, cope_height_index, drag_height_index, avl_length_index, avl_breadth_index, length = [], breadth = [], cope_height = [], drag_height = [], avl_length = [], avl_breadth = [];
  //Finds whether the heading strings are present
  function findHit(str) {
      str=str.replace(/\"/g,'');
    str = str.toLowerCase().trim();
    if (typeof str !== 'undefined') {
      if (str.indexOf("length") !== -1 && str.indexOf("breadth") !== -1 && str.indexOf("height") !== -1) {
        return 3;
      } else {
        return 0;
      }
    }
    return 0;
  }
  
  //Finding the line which contains the headings
  function findColumnHeadings() {
    var i;
    for (i = 0; i < 6; i += 1) {
      if (findHit(file_lines[i]) === 3) {
        row_index = i;
        break;
      }
    }
   
    var cells = file_lines[row_index].split(',');
    var found_headings_count = 0;
    $.each(cells, function (key, value) {
      value = value.toLowerCase().trim();
      value = value.replace("_", "");
        value=value.replace(/\"/g,'');
      if (value === "length") {
        length_index = key;
      } else if (value === "breadth") {
        breadth_index = key;
      } else if (value === "dragheight") {
        drag_height_index = key;
      } else if (value === "copeheight") {
        cope_height_index = key;
      } else if (value === "avllength") {
        avl_length_index = key;
      } else if (value === "avlbreadth") {
        avl_breadth_index = key;
      }
    });
  }
  
  //Finding whether its a valid category to be included or not
  function isValidCategory(category_temp) {
    if (typeof category_temp !== 'undefined') {
      if (category_temp.length > 0) {
        return true;
      }
    }
    return false;
  }
  
  //Extract Category
  function extractCategories(length_index, breadth_index, cope_height_index, drag_height_index, avl_length_index, avl_breadth_index) {
    length_index = parseInt(length_index);
    breadth_index = parseInt(breadth_index);
    cope_height_index = parseInt(cope_height_index);
    drag_height_index = parseInt(drag_height_index);
    avl_length_index = parseInt(avl_length_index);
    avl_breadth_index = parseInt(avl_breadth_index);
    var i;
    for (i = 0; i < file_lines.length; i += 1)
    {
      var cells = file_lines[i].split(',');  
      if ( isValidCategory(cells[length_index]) && i !== row_index )
      {
        if(cells[length_index].toLowerCase().trim().replace(/\"/g,'') == "length" ){}
        else
        {
          length.push(cells[length_index]);
        }
      }
      if( isValidCategory(cells[breadth_index]) && i !== row_index )
      {
        if(cells[breadth_index].toLowerCase().trim().replace(/\"/g,'') == "breadth" ){}
        else
        {
              breadth.push(cells[breadth_index]);
        }
      }
      if( isValidCategory(cells[drag_height_index]) && i!== row_index)
      {
        if(cells[drag_height_index].toLowerCase().trim().replace(/\"/g,'') == "drag_height" ){}
        else
        {
          drag_height.push(cells[drag_height_index]);
        }
      }
       if( isValidCategory(cells[cope_height_index]) && i!== row_index )
      {
        if(cells[cope_height_index].toLowerCase().trim().replace(/\"/g,'') == "cope_height" ){}
        else
        {
          cope_height.push(cells[cope_height_index]);
        }
      }
      if( isValidCategory(cells[avl_length_index]) && i!== row_index )
      {
        if(cells[avl_length_index].toLowerCase().trim().replace("_","") == "avllength" ){}
        else
        {
          avl_length.push(cells[avl_length_index]);
        }
      }
      if( isValidCategory(cells[avl_breadth_index]) && i!== row_index )
      {
        if(cells[avl_breadth_index].toLowerCase().trim().replace("_","") == "avlbreadth" ){}
        else
        {
          avl_breadth.push(cells[avl_breadth_index]);
        }
      }
      
    }
  }
  
  //Append the Dimension
  function appendDimension()
  {
    var insert_box_dimension_start="<option ";
    var insert_box_dimension_end="</option>";
    
    for(i=0;i<length.length;i++)
    {
       
      $("#box_size").append(insert_box_dimension_start+"data-avl-length='"+avl_length[i].replace(/\"/g,'')+"' data-avl-breadth='"+avl_breadth[i].replace(/\"/g,'')+"' >" +length[i].replace(/\"/g,'')+"X"+breadth[i].replace(/\"/g,'')+"X"+cope_height[i].replace(/\"/g,'')+"X"+drag_height[i].replace(/\"/g,'')+insert_box_dimension_end);
  }
  }
  //Storing details of the file
  function inferFile()
  {
    //findColumnHeadings();
     
    extractCategories(length_index,breadth_index,cope_height_index,drag_height_index,avl_length_index,avl_breadth_index);
    appendDimension();
    
  }
  $("#box_success").hide();
  $("#box_error").hide();
  /*$('#input_file').on('change', function(){
    var file = this.files[0];
    var reader = new FileReader();
      reader.readAsText(file);
    if(file.name  === "box_dimension.csv")
    {*/
      $("#box_error").hide();
      $("#error-message").hide();
      $("#input_file").prop('disabled', true);
      if($("#box_dimension_file").hasClass("has-error"))
      {
        $("#box_dimension_file").removeClass("has-error");
      }
      $("#box_dimension_file").addClass("has-success");
      $("#box_dimension_file").addClass("has-feedback");
      $("#box_success").show();
      
    //  reader.onload = function(progressEvent){
      //  main_file_data = this.result;
        //var lines = this.result.split('\n');
    /*    main_file_data = $("#box_dimension_content").html().trim();
    
    
        var lines = main_file_data.split('\n');
        for(var line = 0; line < lines.length; line++){
          file_lines.push(lines[line]);
        }
        inferFile();
      //};

   /* }
    else{
      $("#box_success").hide();
      if($("#box_dimension_file").hasClass("has-success"))
      {
        $("#box_dimension_file").removeClass("has-success");
      }
      $("#box_dimension_file").addClass("has-error");
      $("#box_dimension_file").addClass("has-feedback");
      $("#box_error").show();
      $("#error-message").html("<div class='alert alert-danger' role='alert'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only'>Error:</span>Uploaded Wrong File</div>'");
    }
  });
  */
  $("#new_weight").keyup(function(){
    var get_weight=$("#get_weight").val();
  var weight=$("#new_weight").val()*get_weight;
      $("#cast_value").val(weight.toFixed(2));
    });
  $("#weight").change(function(){
    var get_weight=$("#get_weight").val();
    var weight=$(this).val();
    if(weight.toLowerCase()==="others")
    {
      $("#weight").hide();
      $("#machine_name").text('Customize Machining Allowance')
      $("#new_weight").show();
      $("#cast_value").val(0.00);
    }
    else
    {
      $("#weight").show();
    $("#new_weight").hide();  
    if(get_weight===0)
    {
      $("#weight").val($("#weight option:first").val());
    }
    else
    {
      var weight=$("#weight").val()*get_weight;
      $("#cast_value").val(weight.toFixed(2));
    }
  }
  });
  $("#get_weight").keyup(function(){
    var val = $("#weight").val();
   if(val != 'null')
   {
      if(val==="Others")
      {
        val=$("#new_weight").val();
      }
     var weight = val * $(this).val();
     $("#cast_value").val(weight.toFixed(2));
   }
  }); 
  $("#length_size").change(function(){
    var breadth_size = $("#breadth_size :selected").val();
    var drag_size = $("#drag_height_size :selected").val();
    var cope_size = $("#cope_height_size :selected").val();
    
    if(isNaN(breadth_size) && isNaN(drag_size) && isNaN(cope_size))
    {
     // console.log("Some are missing");
    }
    else
    {
      var avl_length = $("#length_size :selected").data("avl-length");
      var avl_breadth = $("#breadth_size :selected").data("avl-breadth");
    }
  });
});