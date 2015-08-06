angular.module('rest').factory('Container', [function defineContainer() {

    /**
     * The object returned by REST API calls when representing the data
     * associated with a container.
     *
     * @constructor
     * @param {Container|Object} [template={}]
     *     The object whose properties should be copied within the new
     *     Container.
     */
    var Container = function Container(template) {

        // Use empty object by default
        template = template || {};

        /**
         * Args of this container.
         *
         * @type String[]
         */
        this.Args = template.Args;

        /**
         * Config of this container.
         *
         * @type Object.<String, Object>
         */
        this.Config = template.Config;

        /**
         * Created time of this container.
         *
         * @type String
         */
        this.Created = template.Created;

        /**
         * Driver of this container.
         *
         * @type String
         */
        this.Driver = template.Driver;

        /**
         * ExecDriver of this container.
         *
         * @type String
         */
        this.ExecDriver = template.ExecDriver;

        /**
         * Host config of this container.
         *
         * @type Object.<String, Object>
         */
        this.HostConfig = template.HostConfig;

        /**
         * Hostname path of this container.
         *
         * @type String
         */
        this.HostnamePath = template.HostnamePath;

        /**
         * Hosts path of this container.
         *
         * @type String
         */
        this.HostsPath = template.HostsPath;

        /**
         * Path of this container.
         *
         * @type String
         */
        this.Path = template.Path;

        /**
         * Resolve conf path of this container.
         *
         * @type String
         */
        this.ResolvConfPath = template.ResolvConfPath;

        /**
         * State of this container.
         *
         * @type Object.<String, String | Number | Boolean>
         */
        this.State = template.State;

        /**
         * Volumes of this container.
         *
         * @type Object.<String, String>
         */
        this.Volumes = template.Volumes;

        /**
         * Volumes RW of this container.
         *
         * @type Object.<String, Boolean>
         */
        this.VolumesRW = template.VolumesRW;

        /**
         * Id of this container.
         *
         * @type String
         */
        this.Id = template.Id;

        /**
         * Name of this container.
         *
         * @type String
         */
        this.Name = template.Name;

        /**
         * Network settings of this container.
         *
         * @type String
         */
        this.NetworkSettings = template.NetworkSettings;

        /**
         * Image id of this container.
         *
         * @type String
         */
        this.Image = template.Image;

        /**
         * MountLabel of this container.
         *
         * @type String
         */
        this.MountLabel = template.MountLabel;
    };

    return Image;

}]);
