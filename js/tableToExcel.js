function TableToExcel(tableid)
    {
      var id=$('[id$="'+tableid+'"]');
      var strCopy=$('<div></div>').html(id.clone()).html();
      console.log(strCopy);
    
      window.clipboardData.setData("Text",strCopy);
      var objExcel= new ActiveXObject("Excel.Application");
      objExcel.visible = false;
      var objWorkbook=objExcel.Workbooks.Add;
      var objWorksheet=objWorkbook.Worksheets(1);
      objWorksheet.Paste;
      objExcel.visible=true;
    }