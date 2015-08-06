angular.module('rest').factory('ImageSample', [function defineImageSample() {

    /**
     * The object returned by REST API calls when representing the data
     * associated with a image.
     *
     * @constructor
     * @param {ImageSample|Object} [template={}]
     *     The object whose properties should be copied within the new
     *     ImageSample.
     */
    var ImageSample = function ImageSample(template) {

        // Use empty object by default
        template = template || {};

        /**
         * Created time of this image.
         *
         * @type String
         */
        this.Created = template.Created;

        /**
         * Id of this image.
         *
         * @type String
         */
        this.Id = template.Id;

        /**
         * Parent id of this image.
         *
         * @type String
         */
        this.ParentId = template.ParentId;

        /**
         * Repository Tags of this image.
         *
         * @type Sting[]
         */
        this.RepoTags = template.RepoTags;

        /**
         * Size of this image.
         *
         * @type Number
         */
        this.Size = template.Size;

        /**
         * Virtual size of this image.
         *
         * @type Number
         */
        this.VirtualSize = template.VirtualSize;
    };

    return ImageSample;

}]);
