RegisterNetEvent("pRuncode:serverEvent")
AddEventHandler("pRuncode:serverEvent", function(id, data)
    local src = source
    if not IsPlayerAceAllowed(src, "runcode2") then return end

    if id == 1 then
        local language, client, code = data.language, data.client, data.code

        if client then
            TriggerClientEvent(language == 0 and "pRuncode:clientEvent" or "pRuncode:jsEvent", src, 2, code)
        else
            if language ~= 0 then
                TriggerEvent("pRuncode:serverJS", code)
            else
                local stringFunction, errorMessage = load("return " .. code)
                if errorMessage then
                    stringFunction, errorMessage = load(code)
                end
        
                pcall(stringFunction)
            end
        end
    end
end)

RegisterCommand("runcode2", function(src)
    if src == 0 or not IsPlayerAceAllowed(src, "runcode2") then return end
    TriggerClientEvent("pRuncode:clientEvent", src, 1)
end)