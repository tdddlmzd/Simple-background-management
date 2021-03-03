import Vue from 'vue';
import _ from 'lodash';
import ar from "element-ui/src/locale/lang/ar";

const isValid = (array, fn = val => val) => {
    return Array.isArray(array) && array.length ? fn(array) : null;
}

const map = (array) => {
    return array.map(it => ({
        ...it,
        value: it.id,
        label: it.columnName,
        children: isValid(it.children, map)
    }))
};

export function handleColumn(columns, withRoot) {
    columns = map(columns || []);
    if (withRoot) {
        return [{
            id: 0,
            value: 0,
            label: 'Root',
            children: isValid(columns.filter(i => i.value > 0).map(it => {
                it.parentId = 0;
                return it;
            }))
        }]
    }
    return columns;
}

export function listColumn(withCount) {
    return Vue.prototype.$http.get('/schedules/cms/listColumn', {
        params: {
            withCount: !!withCount
        }
    });
}

export function getShipping() {
    return Vue.prototype.$http.get('/trace/fore/getShipping');
}

export function lookFor(id, columns) {
    let paths = [];
    const find = (id, columns) => {
        for (const column of columns) {
            if (column.id === id) {
                paths.push(column.id);
                return column;
            } else {
                if (Array.isArray(column.children)) {
                    let b = find(id, column.children);
                    if (b) {
                        paths.push(column.id);
                        return b;
                    }
                }
            }
        }
    }
    find(id, columns);
    return paths.reverse();
}

export const confirm = {

    created() {
        this.$confirm2 = _.wrap(this.$confirm, function (func, message) {
            return func(`<div class='tesDiv'><div>${message || '是否确认保存？'}</div></div>`, "", {
                cancelButtonClass: "btnCustomCencel",
                confirmButtonClass: "btnCustomSubmit",
                customClass: "customClass",
                dangerouslyUseHTMLString: true
            });
        });
    }

}