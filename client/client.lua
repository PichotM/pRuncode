-- https://docs.fivem.net/game-references/controls/
local KEY_RUNCODE = 318 -- F5

RegisterNUICallback("nuiCallback", function(data, cb)
    local eventName = data.eventName

    if eventName == "runcode" then
        TriggerServerEvent("pRuncode:serverEvent", 1, data)
    elseif eventName == "hideEditor" then
        SetNuiFocus(false, false)
    end

    cb("ok")
end)

RegisterNetEvent("pRuncode:clientEvent")
AddEventHandler("pRuncode:clientEvent", function(id, data)
    if id == 1 then
        SendNUIMessage({ eventName = "showEditor" })
        SetNuiFocus(true, true)
    elseif id == 2 then
        local stringFunction, errorMessage = load("return " .. data)
        if errorMessage then
            stringFunction, errorMessage = load(data)
        end

        pcall(stringFunction)
    end
end)

CreateThread(function()
    SetNuiFocus()

    while true do
        Wait(0)

        if IsControlJustPressed(0, KEY_RUNCODE) then
            ExecuteCommand("runcode2")
        end
    end 
end)