function convertToDatetime(ts) {
    let seconds = parseInt(ts);
    if (isNaN(seconds)) {
        return '';
    }

    if (seconds < 100000) {
        return '';
    }

    let date = new Date(seconds * 1000);
    return date.toLocaleString();
}

const itemId  = "convert-timestamp";
function createItem(title) {
    browser.menus.create({
        id: itemId,
        title,
        contexts: ["selection"],
    }, () => {
        browser.menus.refresh()
    });
}

function removeItem(){
    browser.menus.removeAll();
}

browser.menus.onHidden.addListener(removeItem);

browser.menus.onShown.addListener(e => {
    if (e.selectionText) {
        let date = convertToDatetime(e.selectionText);
        if (date) {
            createItem(date);
        }
    }

});