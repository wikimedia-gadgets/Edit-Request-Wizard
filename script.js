$(document).ready(function () {

  //CSS loader
  mw.util.addCSS( '.heading { font-size: 20px; text-align: center; margin: 10px; width:100% }');
  mw.util.addCSS( '.help { font: 13px cursive; font-style: italic }');
  mw.util.addCSS( '.status { font: 13px sans-serif; margin: 5px; width: 70%; font-style: italic }');
  mw.util.addCSS( '.button { display: inline-block; text-align: center; margin-top: 10px; margin-bottom: 10px }' );
  mw.util.addCSS( '.container { width: 350px; height:200px }');
  mw.util.addCSS( '.status:empty { display: none }');

  // It is important to make sure that OOUI is loaded before we can make use of it.
  mw.loader.using("oojs-ui", "mediawiki.api").done(function () {

    var linkfieldset = new OO.ui.FieldsetLayout({
        classes: ["heading"],
        label: "EDIT WIZARD",
      }),
      linkheading = new OO.ui.LabelWidget({
        label: "URL to the Source",
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
      linkbutton = new OO.ui.ButtonWidget({
        label: "Next",
        classes: ["button"],
        flags: ["primary", "progressive"],
      }),

      linkpanel = new OO.ui.PanelLayout({
        content: [
          linkfieldset,
          linkheading,
          linkhelp,
          linkinput,
          linkstatus,
          linkbutton,
        ],
        padded: true,
      }),

      selectfieldset = new OO.ui.FieldsetLayout({
        classes: ["heading"],
        label: "EDIT WIZARD",
      }),
      selectfieldsetcontent = new OO.ui.FieldsetLayout({
        label: "Please select the text from the article and click Next button",
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
          selectfieldset,
          selectfieldsetcontent,
          selectstatus,
          selectbackbutton,
          selectbutton,
        ],
        padded: true,
      }),


      quotefieldset = new OO.ui.FieldsetLayout({
        classes: ["heading"],
        label: "EDIT WIZARD",
      }),
      quoteheading = new OO.ui.LabelWidget({
        label: "Enter the Quote below",
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
            "<p>Type the quote text from the above mentioned source you want to edit.\u200e</p>"
          ),
          padded: true,
          align: "center",
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
          quotefieldset,
          quoteheading,
          quotehelp,
          quoteinput,
          quotestatus,
          quotebackbutton,
          quotebutton,
        ],
        padded: true,
      }),

      

      requotefieldset = new OO.ui.FieldsetLayout({
        classes: ["heading"],
        label: "EDIT WIZARD",
      }),
      requoteheading = new OO.ui.LabelWidget({
        label: "Enter the rephrase Quote",
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
            requotefieldset,
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

      linkbutton.on('click', handlelinkNext);
      quotebutton.on('click', handlequoteNext);
      selectbutton.on('click', handleselectNext);
      quotebackbutton.on('click', handlequoteBack);
      requotebackbutton.on('click', handlerequoteBack);
      selectbackbutton.on('click', handleselectBack);
      requotebutton.on('click', handlePublish);
      selectbutton.on('click', getSelectionText);

    
    let linkurl, website;
    function handlelinkNext(){
      const linkValue = linkinput.getValue();
      const query= encodeURIComponent(linkValue);

      $.ajax( {
        beforeSend: function (request) {
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('accept-language', 'en'); // Use this header to request the resource in the particular language, i.e. 'en', 'de'
    
        },
        url: `https://en.wikipedia.org/api/rest_v1/data/citation/mediawiki/${query}`,
        type: 'GET',
        dataType: 'json',
        success: function ( citationArray ) {
            linkurl = citationArray[0].url;
            website = citationArray[0].websiteTitle;
        },
        error: function ( request, textStatus, errorThrown) {
            alert( 'Status:'  + textStatus +  'Error: ' + errorThrown );
        }
      } );

      
        if (linkValue === "") {
            linkstatus.setType("warning");
            linkstatus.setLabel("The input cannot be left empty");
        }
        else{
            stack.setItem( selectpanel );
            $( 'body' ).css( 'background-color', '#b8b9ba' );
            $( '#mw-head' ).css( 'background-color', '#b8b9ba' );
        }
        
    }

    let selectValue, selectionSection;
    function handleselectNext(){
      selectValue = getSelectionText();
      selectionSection = getSelectionSection();
      if (selectValue === "") {
          selectstatus.setType("warning");
          selectstatus.setLabel("Please select the text before continuing");
      }
      else{
          stack.setItem( quotepanel );
          $( 'body' ).css( 'background-color', '#f6f6f6' );
          $( '#mw-head' ).css( 'background-color', '#f6f6f6' );
      }
    }

    async function handlequoteNext(){
      const quoteValue = quoteinput.getValue();
      const linkValue = linkinput.getValue();

      const response = await fetch("http://localhost:3000/post", {
        method: "POST",
        body: JSON.stringify({ linkValue, quoteValue }),
        headers: { 'Content-Type': 'application/json' },
      })
      const { isParagraphTextOnPage } = await response.json()
      // console.log(isParagraphTextOnPage);

      if (isParagraphTextOnPage) {
        quotestatus.setType("success");
        quotestatus.setLabel("Verified!");
        stack.setItem( requotepanel );
      }
      else if(!isParagraphTextOnPage) {
        quotestatus.setType("error");
        quotestatus.setLabel("The quote does not match");
      }
      else if (quoteValue === "") {
          quotestatus.setType("warning");
          quotestatus.setLabel("The input cannot be left empty");
      }
    }
    
    function handleselectBack(){
      stack.setItem( linkpanel );
    }
    function handlequoteBack(){
      stack.setItem( selectpanel );
    }
    function handlerequoteBack(){
      stack.setItem( quotepanel );
    }



    
    function editPage( info ) {
      var api = new mw.Api();
      api.postWithToken("csrf", {
        action: 'edit',
        title: info.title,
        appendtext: info.text, // will replace entire page content
        summary: info.summary
      } ).done(function( data ) {
        alert( 'Edit Request sent to talk page..!' );
      } ).fail( function(code, data) {
        console.log( api.getErrorMessage( data ).text());
      } );
    }


    // Function to get the Selected Text 
    function getSelectionText() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      return text;
    }

    function getSelectionSection(){
      var e = window.getSelection().anchorNode.parentElement.closest('p');
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





    function handlePublish(){
        
        const linkValue = linkinput.getValue();
        const quoteValue = quoteinput.getValue();
        const requoteValue = requoteinput.getValue();

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
              text: '\n== Edit Request made by ~~~~ == \n' + '<br><b>Citation:</b> ' + `[${linkValue} ${website}]` + '<br><b>Section to Edit:</b> ' + selectionSection + '<br><b>Spot where to add the fact:</b> ' + selectValue + '<br><b>Quote:</b> ' + quoteValue + '<br><b>Rephrased Quote:</b> ' + requoteValue + '<br> ',
              summary: 'Edit Request to add a fact'
            }); 
        }
    }



    // A popup button widget is instantiated
    const popUp = new OO.ui.PopupButtonWidget({
      label: "EDIT WIZARD",
      popup: false,
      align: "force-right",
      popup: {
        $content: stack.$element,
        padded: true,
        width: 400,
        height: 270,
        position: "after",
        head: true,
        // autoClose: false,
        hideCloseButton: false,
      },
    });

    // Appends the popup button widget to the left section of the wiki page
    $("#p-navigation").append(popUp.$element);
  });
});