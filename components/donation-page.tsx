"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coffee, Heart, Github, Star } from "lucide-react"

export function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const predefinedAmounts = [1, 5, 100]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const getFinalAmount = () => {
    return selectedAmount || Number.parseFloat(customAmount) || 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 p-6">
      <div className="max-w-lg mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6">
            <Coffee className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">DevSupport</span>
          </div>
        </div>

        {/* Developer Profile */}
        <Card className="mb-8 shadow-soft-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="relative mb-6">
              <Avatar className="w-24 h-24 mx-auto shadow-soft">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-xl font-semibold bg-gradient-yellow text-white">JD</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-soft">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
            </div>
            <CardTitle className="text-2xl mb-2">John Developer</CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 text-base">
              <Github className="w-4 h-4" />
              Building amazing open source tools
            </CardDescription>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                89 supporters
              </span>
              <span>•</span>
              <span>$1,234 raised</span>
            </div>
          </CardHeader>
        </Card>

        {/* Donation Form */}
        <Card className="shadow-soft-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-yellow rounded-lg shadow-soft">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              Buy me a coffee
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Support my work and help me keep building awesome projects! Every contribution makes a difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Predefined Amounts */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Choose an amount</Label>
              <div className="grid grid-cols-3 gap-4">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className={`h-14 text-lg font-semibold transition-all duration-200 ${
                      selectedAmount === amount
                        ? "gradient-yellow text-white shadow-soft border-0 scale-105"
                        : "bg-white/80 hover:bg-yellow-50 border-yellow-200 hover:border-yellow-300 hover:scale-105"
                    }`}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount" className="text-base font-semibold mb-3 block">
                Or enter a custom amount
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg font-semibold">
                  $
                </span>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10 h-14 text-lg bg-white/80 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                  min="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Donor Name */}
            <div>
              <Label htmlFor="donor-name" className="text-base font-semibold mb-3 block">
                Your name (optional)
              </Label>
              <Input
                id="donor-name"
                placeholder="Enter your name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                disabled={isAnonymous}
                className="h-12 text-base bg-white/80 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/20 disabled:opacity-50"
              />
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => {
                  setIsAnonymous(checked as boolean)
                  if (checked) setDonorName("")
                }}
                className="border-yellow-300 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label htmlFor="anonymous" className="text-base cursor-pointer">
                Make this donation anonymous
              </Label>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button
              className="w-full h-14 text-lg font-semibold gradient-yellow text-white shadow-soft-lg border-0 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
              disabled={getFinalAmount() <= 0}
            >
              <Heart className="w-5 h-5 mr-3 fill-current" />
              Support with ${getFinalAmount().toFixed(2)}
            </Button>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-yellow-700">DevSupport</span>
          </p>
        </div>
      </div>
    </div>
  )
}
