'use strict';

angular.module('formulario').service('$menuItemsFormulario', ['Auth',
  function (Auth) {

    this.menuItems = [];

    var $menuItemsRef = this;

    var menuItemObj = {
      parent: null,

      title: '',
      link: '', // starting with "./" will refer to parent link concatenation
      state: '', // will be generated from link automatically where "/" (forward slashes) are replaced with "."
      icon: '',

      isActive: false,
      label: null,

      menuItems: [],

      setLabel: function (label, color, hideWhenCollapsed) {
        if (typeof hideWhenCollapsed === 'undefined')
          hideWhenCollapsed = true;

        this.label = {
          text: label,
          classname: color,
          collapsedHide: hideWhenCollapsed
        };

        return this;
      },

      addItem: function (title, link, icon) {
        var parent = this,
          item = angular.extend(angular.copy(menuItemObj), {
            parent: parent,

            title: title,
            link: link,
            icon: icon
          });

        if (item.link) {
          if (item.link.match(/^\./))
            item.link = parent.link + item.link.substring(1, link.length);

          if (item.link.match(/^-/))
            item.link = parent.link + '-' + item.link.substring(2, link.length);

          item.state = $menuItemsRef.toStatePath(item.link);
        }

        this.menuItems.push(item);

        return item;
      }
    };

    this.addItem = function (title, link, icon) {
      var item = angular.extend(angular.copy(menuItemObj), {
        title: title,
        link: link,
        state: this.toStatePath(link),
        icon: icon
      });

      this.menuItems.push(item);

      return item;
    };

    this.getAll = function () {
      return this.menuItems;
    };

    this.prepareSidebarMenu = function () {
      this.menuItems = [];

      //var rolesSession = [];
      //if (Auth.authz.resourceAccess.certamb_app) {
      //  rolesSession = Auth.authz.resourceAccess.certamb_app.roles;
      //}

      var menu01 = this.addItem('Encuestas', '');
      var menu02 = this.addItem('Menu02', '');

      //if (rolesSession.indexOf('ver-direccionesRegionales') !== -1) {
      menu01.addItem('Encuestas', 'formulario.app.menu01.encuesta');
      //}

      menu02.addItem('SubMenu02', '');

      return this;
    };

    this.instantiate = function () {
      return angular.copy(this);
    };

    this.toStatePath = function (path) {
      return path.replace(/\//g, '.').replace(/^\./, '');
    };

  }
]);
