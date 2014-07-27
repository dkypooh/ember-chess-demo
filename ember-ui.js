    var CPUI = Em.Application.create();
    Cloudpane = Em.Object.create({
      global_theme:'bootstrap',
    });

/*****************************************继承View***************************************/
  CPUI.BaseView  = Em.Mixin.create({
    init:function(){
      this._super();
      if(this.ui_theme != ''){
        this.classNames.insertAt(0,this.ui_theme);
      }
      //this.classNames.removeObject("ember-view");
    },
    ui_theme:Cloudpane.global_theme,
    grid:{},//EndpointOS Only
    background_color:undefined,//EndpointOS Only
    color:undefined,
    text_align:undefined,//left right center
    position:'absolute',
    font_size:undefined,
    line_height:undefined,
    classNames:undefined,
    display:undefined,
    didInsertElement:function(){
      this._super();
      var el =this.$();
      el.css({
      /****************************************************/
        top:this.grid.top,
        left:this.grid.left,
        bottom:this.grid.bottom,
        right:this.grid.right,
        width:this.grid.width,
        height:this.grid.height,
        minWidth:this.grid.minWidth,
        maxWidth:this.grid.maxWidth,
        minHeight:this.grid.minHeight,
        maxHeight:this.grid.maxHeight,
        textAlign:this.text_align,
        position:this.position,
        color:this.color,
        lineHeight:this.grid.line_height+'px',
        fontSize:this.font_size,
        display:this.diplay,
        backgroundColor:this.background_color   //css属性可扩展
      /****************************************************/
      });

      if(this.position == 'absolute') {
        if (this.grid.centerX != undefined) {
                  var width = el.width();
                  if (this.grid.centerX == 0) {
                      el.css({left:'50%',marginLeft:-width / 2});
                  } else {
                      el.css({left:this.grid.centerX.toString() + '%',marginLeft:-width / 2});
                  }
              }
              if (this.grid.centerY != undefined) {
                  var height = el.height();
                  if (this.grid.centerY == 0) {
                      el.css({top:'50%',marginTop:-height / 2});
                  } else {
                      el.css({top:this.grid.centerY.toString() + '%',marginTop:-height / 2});
                  }
              }
            } // end of absolute 
    }//  end of common =>View
  });

/*******************************************View************************************************/
  CPUI.View = Em.View.extend(CPUI.BaseView,{
  });//end of CPUI　View


/*******************************************LabelView******************************************/

  
  CPUI.LabelView = CPUI.View.extend({
      tagName:'', //p span h1 h2 h3....
      value:'',
      template:Em.Handlebars.compile('{{value}}'),
    });

/********************************************TextAreaView*******************************************/
  
 CPUI.TextAreaView =Em.TextArea.extend(CPUI.BaseView,{
    value:'',
    placeholder:'',
  });

/********************************************TextFieldView*******************************************/
 CPUI.TextFieldView = Em.TextField.extend(CPUI.BaseView,{
    value:'',
    placeholder:'',
    type:'',//text password submit radio.....
    focusOut:function(){
        this.$().css({backgroundColor:'#EEE'});
    },
    click:function(){
        this.$().css({backgroundColor:'white'});
    },
  });

/********************************************ButtonView*********************************************/
CPUI.ButtonView = Em.ContainerView.extend(CPUI.BaseView,{

      tagName:'a',
      childViews:['btnContent'],
      classNameBindings:['btn_bgc'],
       
        
      btn_bgc:'',//btn-primary btn-info btn-success btn-warning btn-danger btn-inverse
      icon_white:'',
      btn_icon:'',
      btn_name:'',
      icon_margin:'',
      btn_font_size:'',
      btn_font_type:'',
      btnContent:Em.ContainerView.extend({
        childViews:['btnIcon','btnValue'],
        didInsertElement:function(){
            var Icon = this.get('parentView').get('btn_icon');
            var IconWhite = this.get('parentView').get('icon_white');
            var FontSize = this.get('parentView').get('btn_font_size');
            var ValueClass = this.get('parentView').get('btn_font_type');
            var LineHeight = this.get('parentView').grid.height;
            var IconMargin = this.get('parentView').get('icon_margin');
          //  console.log(icon_margin);
             this.get("btnIcon").$().addClass(Icon);
             this.get("btnIcon").$().addClass(IconWhite);
             this.get("btnIcon").$().css({margin:IconMargin});
             this.get("btnValue").$().css({fontSize:FontSize , lineHeight:LineHeight+'px',});
             this.get("btnValue").$().addClass(ValueClass);

        },
        btnIcon:Em.View.extend({
            tagName:'i',
        }),
        btnValue:Em.View.extend({
            tagName:'span',
            template:Em.Handlebars.compile(' {{btn_name}}XXXXXX'),
            click:function(){
               alert('asfdsas');
            }
        }),
      }),//end of btnCotent
});// end of ButtonView


/*****************************************DropView********************************************/
 CPUI.DropView = Em.ContainerView.extend(CPUI.BaseView,{
      childViews:['btnValue','btnIcon','listUl'],
      classNames:['btn-group'],

      btn_value:'',
      li_content:[],
      icon_type:'',
      ul_width:'',
      btn_width:'',

      /**********************************子元素列表*************************************/
      btnValue:Em.View.extend({
        tagName:'button',
        classNames:['btn btn-small'],
        didInsertElement:function(){
          this._super();
          var btn_width = this.get('parentView').get('btn_width');
          this.$().css({width:btn_width});
        },
        template:Em.Handlebars.compile('<span>{{btn_value}}</span>'),
      }),

      btnIcon:Em.View.extend({
        tagName:'button',
        classNames:['btn btn-small dropdown-toggle'],
        didInsertElement:function(){
          this._super();
          this.$().css({height:26});
        },
        click:function(){
            this.get('parentView').$().toggleClass('open');
        },
        template:Em.Handlebars.compile('<i {{bindAttr class="icon_type"}}></i>'),
      }),

      /***********************************ListUl*******************************************/
      listUl:Em.CollectionView.extend({
        tagName:'ul',
        classNames:['dropdown-menu'],
        content:[],
        contentBinding:'data.content',
        didInsertElement:function(){
          var ul_width = this.get('parentView').get('ul_width');
          this.$().css({width:ul_width,diplay:'none'});
        },
        init:function(){
            this._super();
            var con  = this.get('parentView').get('li_content');
           // console.log(con);
            this.set('content',con);
        },
        mouseLeave:function(){
        //console.log(this.get(''))
          this.get('parentView').$().removeClass('open');
        },
        itemViewClass:Em.View.extend({
          didInsertElement:function(){
            this._super();
            var className = this.get('content').class;
            this.$().addClass(className);
          },
          click:function(){
              this.get('parentView').$('i').removeClass();
              this.$('i').toggleClass('icon-ok');
              this.get('parentView').get('parentView').set('btn_value',this.get('content').name);
          },
          template:Em.Handlebars.compile('<a href="#"><i class=""></i><span>{{view.content.name}}</span></a>'),
        }),
      }),
  });//end of DropView


 /**********************************************ListView********************************************/

  CPUI.ListView = Em.ContainerView.extend(CPUI.BaseView,{
        childViews:['listHead','listUl'],  

        row_height:'',
        row_width:'',
        li_content:[],
        li_title:'',
        li_font_size:'',
    /***********************************ListUl*******************************************/
        listHead:Em.View.extend({
          tagName:'h2',
          classNames:'nav nav-list nav-header',
          template:Em.Handlebars.compile('{{li_title}}'),
        }),
        listUl:Em.CollectionView.extend({
          tagName:'ul',
          classNames:'nav nav-list',
          content:[],
          init:function(){
            this._super();
            var li_content = this.get('parentView').get('li_content');
            this.set('content',li_content);

          },
          itemViewClass:Em.View.extend({
            didInsertElement:function(){
              this._super();
              // console.log(this.get('parentView').get('parentView'));
              var RowHeight = this.get('parentView').get('parentView').get('row_height');
              var RowWidth = this.get('parentView').get('parentView').get('row_width');
              var LiFontSize = this.get('parentView').get('parentView').get('li_font_size');
              this.$('a').css({width:RowWidth,lineHeight:RowHeight+'px',fontSize:LiFontSize});
            },
            click:function(){   
                 console.log( this.get('parentView').$('li'));
                 this.get('parentView').$().find('li').removeClass('active');
                 this.$().toggleClass('active');
                 this.get('content').edit();
            },
            template:Em.Handlebars.compile('<a href="#"><i {{bindAttr class="view.content.icon_type"}}></i> <span> {{view.content.name}}</span></a>'),
          }),
        }),
    }); //end of ListView