"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildResultHelper = void 0;
class BuildResultHelper {
}
exports.BuildResultHelper = BuildResultHelper;
BuildResultHelper.build = (data, statusCode) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            success: data,
        }),
    };
};
//# sourceMappingURL=BuildResultHelper.js.map