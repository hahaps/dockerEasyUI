angular.module('container').controller('containerCreateController', ['$scope', '$injector',
        function indexController($scope, $injector) {

    // Get container service.
    var containerService = $injector.get("containerService");
    // Get image service.
    var imageService     = $injector.get("imageService");
    var $route           = $injector.get("$route");
    var toastr           = $injector.get("toastr");

    imageService.index().success(function (images) {
      var imgs = [];
      angular.forEach(images, function(ele, index) {
        var img = ele.RepoTags.join(', ');
        imgs.push({
          text: img,
          value: img
        });
      });
      $scope.containerView = {
        slug: 'create_container',
        name: 'Create Container',
        handle: function(form) {
          var data = {
            Hostname:        form.advance.hostname,
            DomainName:      form.advance.domainname,
            User:            form.advance.user,
            AttachStdin:     form.advance.attachStdin || false,
            AttachStdout:    form.advance.attachStdout || false,
            AttachStderr:    form.advance.attachStderr || false,
            OpenStdin:       form.advance.openStdin || true,
            StdinOnce:       form.advance.stdinOnce || true,
            Tty:             form.advance.tty || false,
            Env:             form.basic.env || null,
            Cmd:             form.basic.cmd ? form.basic.cmd.split(' ') : [],
            Entrypoint:      form.basic.entrypoint,
            Image:           form.basic.image,
            Labels:          JSON.parse('{' + (form.basic.labels || '') + '}'),
            Volumes:         JSON.parse('{' + (form.volume.volumes || '') + '}'),
            WorkingDir:      form.advance.workingDir,
            NetworkDisabled: form.network.networkDisabled || false,
            MacAddress:      form.network.macAddress,
            ExposedPorts:    JSON.parse('{' + (form.network.exposedPorts || '') + '}'),
            HostConfig: {
              Memory:       form.host.memory,
              MemorySwap:   form.host.memorySwap,
              CpuShares:    form.host.cpuShares,
              CpuPeriod:    form.host.CpuPeriod,
              NetworkMode:  form.host.networkMode,
              PortBindings: JSON.parse('{' + form.basic.portBindings + '}'),
              DNS:          form.host.dns ? form.host.dns.split(' ') : []
            }
          };
          var query = {name: form.basic.name};
          containerService.create(data, query).success(function(container) {
            $route.reload(true);
            $scope.$close();
            toastr.success("Successfully create a container");
          }).error(function(err) {
            toastr.error("Failed to create container as: " + err);
          });
        },
        panelGroups: [{
          slug: 'basic',
          name: 'Basic info',
          fields: [{
            title: 'Name for this container, please input characters a-z, 0-9, _, ., -. For example container_a1.',
            slug: 'name',
            name: 'Name',
            type: 'text'
          }, {
            title: 'Image for this container, select an image from the image list.',
            slug: 'image',
            name: 'Image',
            type: 'select',
            default: imgs
          }, {
            title: 'Entry point for this container when it start. For example /usr/bin/top -p 1234.',
            slug: 'entrypoint',
            name: "Entrypoint",
            type: 'text'
          }, {
            title: 'Labels for this container. For example "text.v1.com": "abc", "tex.v2.com": "abcd", JSON format.',
            slug: 'labels',
            name: 'Labels',
            type: 'textarea'
          }, {
            title: 'Command for this container when it start. For example /bin/bash -l.',
            slug: 'cmd',
            name: 'CMD',
            type: 'textarea'
          }, {
            title: 'Environment for this container when it start. For example RVM_HOME=/home/rvm JAVA_HOME=/usr/lib/jvm. Split with blank space',
            slug: 'env',
            name: 'Env',
            type: 'textarea'
          }, {
            title: 'A map of exposed container ports and the host port they should map to. A JSON object in the form <port>/<protocol>: [{ "HostPort": "<port>" }] Take note that port is specified as a string and not an integer value.',
            slug: 'portBindings',
            name: 'PortBindings',
            type: 'textarea'
          }]
        }, {
          slug: 'network',
          name: 'Network info',
          fields: [{
            title: 'Whether disable network for this container.',
            slug: 'networkDisabled',
            name: 'Disable Network',
            type: 'checkbox',
            default: false
          }, {
            title: 'MacAddress for this container. For example 46:8c:f8:f9:12:4d.',
            slug: 'macAddress',
            name: 'MacAddress',
            type: 'text'
          }, {
            title: 'Exposed ports for this container. For example "8080/tcp": {}.',
            slug: 'exposedPorts',
            name: 'ExposedPorts',
            type: 'textarea'
          }]
        }, {
          slug: 'volume',
          name: 'Volume info',
          fields: [{
            title: 'An object mapping mount point paths (strings) for the container. For example "/tmp": {}.',
            slug: 'volumes',
            name: 'Volumes',
            type: 'textarea'
          }]
        }, {
          slug: 'host',
          name: 'Host info',
          fields: [{
            title: 'Memory limit in bytes. For example 1024, default is 0.',
            slug: 'memory',
            name: 'Memory',
            type: 'number',
            default: 0
          }, {
            title: 'Total memory limit (memory + swap); set -1 to disable swap You must use this with memory and make the swap value larger than memory.',
            slug: 'memorySwap',
            name: 'MemorySwap',
            type: 'number',
            default: 0
          }, {
            title: 'An integer value containing the container’s CPU Shares (ie. the relative weight vs other containers).',
            slug: 'cpuShares',
            name: 'CpuShares',
            type: 'number',
            default: 0
          }, {
            title: 'The length of a CPU period in microseconds.',
            slug: 'cpuPeriod',
            name: 'CpuPeriod',
            type: 'number',
            default: 0
          }, {
            title: 'Sets the networking mode for the container. Supported values are: bridge, host, and container:<name|id>.',
            slug: 'networkMode',
            name: 'NetworkMode',
            type: 'text',
            default: 'bridge'
          }, {
            title: 'A list of DNS servers for the container to use.',
            slug: 'dns',
            name: 'DNS',
            type: 'textarea',
            default: '8.8.8.8, 114.114.114.114'
          }]
        }, {
          slug: 'advance',
          name: 'Advance info',
          fields: [{
            /*slug: 'attachStdin',
            name: 'AttachStdin',
            type: 'checkbox',
            default: false
          }, {
            slug: 'attachStdout',
            name: 'AttachStdout',
            type: 'checkbox',
            default: false
          }, {
            slug: 'attachStderr',
            name: 'AttachStderr',
            type: 'checkbox',
            default: false
          }, {*/
            title: 'Attach standard streams to a tty, including stdin if it is not closed.',
            slug: 'tty',
            name: 'Tty',
            type: 'checkbox',
            default: true
          }, {
            title: 'A string value containing the hostname to use for the container.',
            slug: 'hostname',
            name: 'Hostname',
            type: 'text'
          }, {
            title: 'A string value containing the domain name to use for the container.',
            slug: 'domainname',
            name: 'DomainName',
            type: 'text'
          }, {
            title: 'A string value specifying the user inside the container',
            slug: 'user',
            name: 'User',
            type: 'text'
          },{
            title: 'A string specifying the working directory for commands to run in',
            slug: 'workingDir',
            name: 'WorkingDir',
            type: 'text'
          }]
        }]
      };
    });
}]);
