// <nowiki>
$(document).ready(function () {

  //CSS loader
  mw.loader.addStyleTag( '.heading { font-size: 18px; text-align: center; margin: 5px; width:100% }');
  mw.loader.addStyleTag( '.help { font-size: 13px; font-style: italic }');
  mw.loader.addStyleTag( '.status { font: 13px sans-serif; margin: 5px; width: 70%; font-style: italic; width: 100% }');
  mw.loader.addStyleTag( '.messageStatus { font: 12px sans-serif; margin-left: 1rem; margin: 5px; width: 70%; font-style: italic; width: 100% }');
  mw.loader.addStyleTag( '.button { display: inline-block; text-align: center; margin-top: 10px; margin-bottom: 10px }' );
  mw.loader.addStyleTag( '.container { width: 415px; height:150px }');
  mw.loader.addStyleTag( '.status:empty { display: none }');

  // It is important to make sure that OOUI is loaded before we can make use of it.
  mw.loader.using("oojs-ui", "mediawiki.api").done(function () {

      linkheading = new OO.ui.LabelWidget({
        label: "Give a source for your fact",
        classes: ["label"],
      }),
      linkhelp = new OO.ui.PopupButtonWidget({
        icon: "info",
        classes: ["help"],
        framed: false,
        label: "More information",
        invisibleLabel: true,
        popup: {
          head: true,
          icon: "infoFilled",
          label: "More information",
          $content: $(
            "<p>This is the link of the source of your quote.\u200e</p>"
          ),
          padded: true,
          align: "center",
          width: "300px",
          autoFlip: true,
        },
      }),
      linkinput = new OO.ui.TextInputWidget({
        placeholder: "Enter the URL",
        classes: ["box"],
      }),
      linkstatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      linkverifybutton = new OO.ui.ButtonWidget({
        label: "Verify",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      linkbutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      linkpanel = new OO.ui.PanelLayout({
        content: [
          linkheading,
          linkhelp,
          linkinput,
          linkstatus,
          linkverifybutton,
          linkbutton,
        ],
        padded: true,
      }),

      selectfieldsetcontent = new OO.ui.FieldsetLayout({
        label: "Select the sentence in the article that your text should go after and click Next",
        classes: ["label"],
      }),
      selectstatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      selectbutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      selectbackbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      selectpanel = new OO.ui.PanelLayout({
        content: [
          selectfieldsetcontent,
          selectstatus,
          selectbackbutton,
          selectbutton,
        ],
        padded: true,
      }),


      quoteheading = new OO.ui.LabelWidget({
        label: "Quote from your source that supports your fact",
        classes: ["label"],
      }),
      quotehelp = new OO.ui.PopupButtonWidget({
        icon: "info",
        classes: ["help"],
        framed: false,
        label: "More information",
        invisibleLabel: true,
        popup: {
          head: true,
          icon: "infoFilled",
          label: "More information",
          $content: $(
            "<p>Type the quote text from the above-mentioned source you want to edit.\u200e</p>"
          ),
          padded: true,
          align: "backwards",
          autoFlip: true,
        },
      }),
      quoteinput = new OO.ui.MultilineTextInputWidget({
        autosize: false,
        classes: ["box"],
        rows: 3,
        placeholder: "Enter the Quote from the source",
      }),
      quotestatus = new OO.ui.MessageWidget({
        inline: true,
        classes: ["status"],
        showClose: true,
        icon:"none",
      }),
      quotebutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),
      quotebackbutton = new OO.ui.ButtonWidget({
        label: "Back",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      quotepanel = new OO.ui.PanelLayout({
        content: [
          quoteheading,
          quotehelp,
          quoteinput,
          quotestatus,
          quotebackbutton,
          quotebutton,
        ],
        padded: true,
      }),

     
      requoteheading = new OO.ui.LabelWidget({
        label: "Rewrite the quote in your own words",
        classes: ["label"],
      }),
        requotehelp = new OO.ui.PopupButtonWidget({
          icon: "info",
          classes: ["help"],
          framed: false,
          label: "More information",
          invisibleLabel: true,
          popup: {
            head: true,
            icon: "infoFilled",
            label: "More information",
            $content: $("<p>Rephrase the quote in your own words.\u200e</p>"),
            padded: true,
            width: "280px",
            align: "center",
            autoFlip: true,
          },
        }),
        requoteinput = new OO.ui.MultilineTextInputWidget({
          autosize: false,
          classes: ["box"],
          rows: 3,
          placeholder: "Enter the rephrased Quote",
        }),
        requotestatus = new OO.ui.MessageWidget({
          inline: true,
          classes: ["status"],
          showClose: true,
          icon:"none",
        }),
        requotebutton = new OO.ui.ButtonWidget({
          label: "Publish",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),
        requotebackbutton = new OO.ui.ButtonWidget({
          label: "Back",
          classes: ["button"],
          flags: ["primary", "progressive"],
        }),

        requotepanel = new OO.ui.PanelLayout({
          content: [
            requoteheading,
            requotehelp,
            requoteinput,
            requotestatus,
            requotebackbutton,
            requotebutton,
          ],
          padded: true,
        });
        

      var stack = new OO.ui.StackLayout({
        classes: ["container"],
        items: [linkpanel, selectpanel, quotepanel, requotepanel],
      });

      //all the functional buttons
      linkverifybutton.on('click', handlelinkVerify);
      linkbutton.on('click', handlelinkNext);
      quotebutton.on('click', handlequoteNext);
      selectbutton.on('click', handleselectNext);
      quotebackbutton.on('click', handlequoteBack);
      requotebackbutton.on('click', handlerequoteBack);
      selectbackbutton.on('click', handleselectBack);
      requotebutton.on('click', handlePublish);
      selectbutton.on('click', getSelectionText);


      let check = 0;
      async function handlelinkVerify(){
        const linkValue = linkinput.getValue();

        linkstatus.setType("none");
        linkstatus.setIcon("null");
        linkstatus.setLabel("Loading...");

        if (linkValue === "") {
          linkstatus.setType("warning");
          linkstatus.setLabel("The input cannot be left empty");
        }
        //Making an API call to the backend to verify if the quote comes from the source
        const host = window.ERW_DEV_MODE ? 'https://edit-wizard.toolforge.org' : 'http://localhost:3000';
        const response = await fetch(`https://edit-wizard.toolforge.org/api/v1/verifySource`, {
          method: "POST",
          body: JSON.stringify({ linkValue}),
          headers: { 'Content-Type': 'application/json'},
        })
        const { comment, flag, kind } = await response.json()
        
        if(flag==2){
          check = 3;
          linkstatus.setType("error");
          linkstatus.setLabel("This is not a valid URL");
        }
        else if (flag==1) {
          check = 1;
          linkstatus.setType("warning");
          linkstatus.setLabel(comment);
          if (kind == "blacklisted" || kind == "unreliable") {
            check = 2;
            linkstatus.setType("error");
            linkstatus.setLabel(comment);
          }
        }
        else if (flag==0){
            check = 1;
            linkstatus.setType("success");
            linkstatus.setLabel("Source probably OK");
        }
      }

    let linkurl, website, selected=0;
    async function handlelinkNext(){
      const linkValue = linkinput.getValue();
      const query= encodeURIComponent(linkValue);

      //API call to make a request from Citoid
      if (linkValue!= "") {
      fetch(`https://en.wikipedia.org/api/rest_v1/data/citation/mediawiki/${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'Api-User-Agent': 'w:en:User:Ankit18gupta/MyScript.js'
        }
      })
        .then(response => response.json())
        .then(citationArray => {
          linkurl = citationArray[0].url;
          website = citationArray[0].title;
        })
        .catch((error) => {
          console.log("Error: ",error);
        });
      }
      // If the linkValue is empty, prompt a warning
      if (linkValue === "") {
          linkstatus.setType("warning");
          linkstatus.setLabel("The input cannot be left empty");
      }
      else if(check == 0){
          linkstatus.setType("warning");
          linkstatus.setLabel("Please verify the quote first");
      }
      else if(check == 2){
          linkstatus.setType("error");
          linkstatus.setLabel("This is a unreliable source, we cannot proceed");
      }
      else if(check == 3){
          linkstatus.setType("error");
          linkstatus.setLabel("This is not a valid URL, we cannot proceed");
      }
      else if(check == 1){
          stack.setItem( selectpanel );
          $("#edit-wizard-link span").html("Done selecting");
          $( 'body' ).css( 'background-color', '#b8b9ba' );
          $( '#mw-head' ).css( 'background-color', '#b8b9ba' );
          selected = 1;
      }
    }

    function doneSelecting(){
      // if(selected){
      //   popUp.toggle(false);
      // }

      if(selected){
        selectValue = getSelectionText();
        selectionSection = getSelectionSection();

      // If the selectValue is empty, prompt a warning
      if (selectValue === "") {
          selectstatus.setType("warning");
          selectstatus.setLabel("Please select the text before continuing");
      }
      else{
          stack.setItem( quotepanel );
          $("#edit-wizard-link span").html("Edit Wizard");
          $( 'body' ).css( 'background-color', '#f6f6f6' );
          $( '#mw-head' ).css( 'background-color', '#f6f6f6' );
          selected = 0;
      }
      }
    }

    
    // Function to get the Selected Text 
    function getSelectionText() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
          text = document.selection.createRange().text;
      }
      return text;
    }

    // Funtion to get the target Section
    function getSelectionSection(){
      var e = window.getSelection().anchorNode.parentElement;
      var found_it = false;
      while (e.tagName.toLowerCase() !== 'body') {
          if (e.tagName.toLowerCase() === 'h2') {
              found_it = true;
              break;
          }
          if (e.previousElementSibling) {
              e = e.previousElementSibling;
          } else {
              e = e.parentNode;
          }
      }
      return e.firstChild.textContent;
    }

    let selectValue, selectionSection;
    function handleselectNext(){
      selectValue = getSelectionText();

      // If the selectValue is empty, prompt a warning
      if (selectValue === "") {
          selectstatus.setType("warning");
          selectstatus.setLabel("Please select the text before continuing");
      }
      else{
          selectionSection = getSelectionSection();
          stack.setItem( quotepanel );
          selected = 0;
          $("#edit-wizard-link span").html("Edit Wizard");
          $( 'body' ).css( 'background-color', '#f6f6f6' );
          $( '#mw-head' ).css( 'background-color', '#f6f6f6' );
      }
    }

    async function handlequoteNext(){
      const quoteValue = quoteinput.getValue();
      const linkValue = linkinput.getValue();

      quotestatus.setType("none");
      quotestatus.setIcon("null");
      quotestatus.setLabel("Loading...");
      

      //Making an API call to the backend to verify if the quote comes from the source
      const host = window.ERW_DEV_MODE ? 'https://edit-wizard.toolforge.org' : 'http://localhost:3000';
      const response = await fetch(`https://edit-wizard.toolforge.org/api/v1/verifyQuote`, {
        method: "POST",
        body: JSON.stringify({ linkValue, quoteValue }),
        headers: { 'Content-Type': 'application/json' },
      })
      const { isParagraphTextOnPage } = await response.json()

      if (quoteValue === "") {
        quotestatus.setType("warning");
        quotestatus.setLabel("The input cannot be left empty");
      }
      else if(!isParagraphTextOnPage) {
        quotestatus.setType("error");
        quotestatus.setLabel("The quote does not match. Please make sure the quote is copied/pasted exactly from the source");
      }
      else if (isParagraphTextOnPage) {
        quotestatus.setType("success");
        quotestatus.setLabel("Verified!");
        stack.setItem( requotepanel );
      }
      
    }
    
    function handleselectBack(){
      stack.setItem( linkpanel );
      $("#edit-wizard-link span").html("Edit Wizard");
      $( 'body' ).css( 'background-color', '#f6f6f6' );
      $( '#mw-head' ).css( 'background-color', '#f6f6f6' );
    }
    function handlequoteBack(){
      stack.setItem( selectpanel );
      selected = 1;
      $("#edit-wizard-link span").html("Done selecting");
      $( 'body' ).css( 'background-color', '#b8b9ba' );
      $( '#mw-head' ).css( 'background-color', '#b8b9ba' );
    }
    function handlerequoteBack(){
      stack.setItem( quotepanel );
      selected = 0;
    }

    // Function to send request to the edit page
    function editPage( info ) {
      var api = new mw.Api();
      api.postWithToken("csrf", {
        action: 'edit',
        title: info.title,
        appendtext: info.text,
        summary: info.summary
      } ).then(function( data ) {
        OO.ui.alert( 'Edit Request sent to talk page..!' );
      } ).catch( function(code, data) {
        console.log( api.getErrorMessage( data ).text());
      } );
    }


    function handlePublish(){
        
        const linkValue = linkinput.getValue();
        const quoteValue = quoteinput.getValue();
        const requoteValue = requoteinput.getValue();
        const firstthree = quoteValue.split(' ').slice(0,3).join(' ');
        const array = quoteValue.split(' ');
        const len = array.length - 3;
        const lastthree = quoteValue.split(' ').slice(len).join(' ');

        if (requoteValue === "") {
            requotestatus.$element.show();
            requotestatus.setType("warning");
            requotestatus.setLabel("The input cannot be left empty");
        }
        else{
            requotestatus.$element.hide();

            // API calls code goes here
            editPage({
              title: (new mw.Title(mw.config.get("wgPageName"))).getTalkPage().toText(),
              text: '\n== Edit Request made by {{subst:REVISIONUSER}} ~~~~~ == \n' + '<br><b>Citation:</b> ' + `[${linkValue} ${website}]` + '<br><b>Section to Edit:</b> ' + selectionSection + '<br><b>Spot where to add the fact:</b> ' + selectValue + '<br><b>Quote:</b> ' + 'Quote starts here - ' + firstthree + '...             ' + lastthree + '<br><b>Rephrased Quote:</b> ' + requoteValue + '<br> ~~~~',
              summary: 'Edit Request to add a fact'
            }); 
        }
    }
    

    var node = mw.util.addPortletLink(
      'p-views',
      "#",
      'Edit Wizard',
      'edit-wizard-link',
      'Edit Wizard',
      "",
      "#ca-history",
    );

    // A popup widget is instantiated
    var popUp = new OO.ui.PopupWidget({
        align: "forwards",
        $floatableContainer: $(node),
        $content: stack.$element,
        padded: true,
        popup: false,
        width: 440,
        height: 220,
        head: true,
        // autoClose: false,
        hideCloseButton: false,
    });
    
    
    //If we are done selecting the text it automatically moves to the next panel
    // $(node).on('click', doneSelecting);

    $(node).on('click', function(e){
      popUp.toggle();
      e.preventDefault();
    })

    $(document.body).append(popUp.$element);
  });
});

// </nowiki>