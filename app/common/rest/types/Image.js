angular.module('rest').factory('Image', [function defineImage() {

    /**
     * The object returned by REST API calls when representing the data
     * associated with a image.
     *
     * @constructor
     * @param {Image|Object} [template={}]
     *     The object whose properties should be copied within the new
     *     Image.
     */
    var Image = function Image(template) {

        // Use empty object by default
        template = template || {};

        /**
         * Architecture of this image.
         *
         * @type String
         */
        this.Architecture = template.Architecture;

        /**
         * Author of this image.
         *
         * @type String
         */
        this.Author = template.Author;

        /**
         * Comment of this image.
         *
         * @type String
         */
        this.Comment = template.Comment;

        /**
         * Config of this image.
         *
         * @type Object.<String, Object>
         */
        this.Config = template.Config;

        /**
         * Container of this image.
         *
         * @type String
         */
        this.Container = template.Container;

        /**
         * ContainerConfig of this image.
         *
         * @type Object.<String, Object>
         */
        this.ContainerConfig = template.ContainerConfig;

        /**
         * Created time of this image.
         *
         * @type String
         */
        this.Created = template.Created;

        /**
         * Version of docker env.
         *
         * @type String
         */
        this.DockerVersion = template.DockerVersion;

        /**
         * ID of this image.
         *
         * @type String
         */
        this.Id = template.Id;

        /**
         * OS type of this image.
         *
         * @type String
         */
        this.Os = template.Os;

        /**
         * Parent id of this image.
         *
         * @type String
         */
        this.Parent = template.Parent;

        /**
         * Size of this image.
         *
         * @type Number
         */
        this.Size = template.Size;
    };

    return Image;

}]);
