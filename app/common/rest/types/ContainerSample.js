angular.module('rest').factory('ContainerSample', [function defineContainerSample() {

    /**
     * The object returned by REST API calls when representing the data
     * associated with a container.
     *
     * @constructor
     * @param {ContainerSample|Object} [template={}]
     *     The object whose properties should be copied within the new
     *     ContainerSample.
     */
    var ContainerSample = function ContainerSample(template) {

        // Use empty object by default
        template = template || {};

        /**
         * Created time of this container.
         *
         * @type String
         */
        this.Created = template.Created;

        /**
         * Id of this container.
         *
         * @type String
         */
        this.Id = template.Id;

        /**
         * Command of this container.
         *
         * @type String
         */
        this.Command = template.Command;

        /**
         * Status of this container.
         *
         * @type String
         */
        this.Status = template.Status;

        /**
         * Names of this container.
         *
         * @type String[]
         */
        this.Names = template.Names;

        /**
         * Ports of this container.
         *
         * @type Object.<String, String | Number>[]
         */
        this.Ports = template.Ports;

        /**
         * Size of this container.
         *
         * @type Number
         */
        this.Size = template.Size;

        /**
         * Virtual size of this container.
         *
         * @type Number
         */
        this.VirtualSize = template.VirtualSize;
    };

    return ContainerSample;

}]);
