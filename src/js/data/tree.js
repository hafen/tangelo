/*jslint browser: true */

(function (tangelo) {
    "use strict";

    tangelo.data.tree = function(spec) {
        var id = tangelo.accessor(spec.id, ""),
            idChild = tangelo.accessor(spec.idChild, ""),
            children = tangelo.accessor(spec.children, []),
            data = spec.data,
            nodeMap = {},
            root;

        data.forEach(function (d) {
            nodeMap[id(d)] = d;
        });

        data.forEach(function (d) {
            if (children(d)) {
                d.children = [];
                children(d).forEach(function (c) {
                    var child = nodeMap[idChild(c)];
                    child.hasParent = true;
                    d.children.push(child);
                });
            }
        });

        data.forEach(function (d) {
            if (!d.hasParent) {
                root = d;
            }
            delete d.hasParent;
        });

        return root;
    };

}(window.tangelo));
