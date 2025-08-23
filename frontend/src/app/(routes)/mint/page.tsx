import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MintPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mint NFT</h1>
          <p className="text-gray-600 mt-2">
            Create your House of Emirates NFT collectible
          </p>
        </div>

        {/* Minting Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>NFT Creation Form</CardTitle>
              <CardDescription>
                Fill in the details to mint your NFT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        NFT Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter NFT name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter description"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Image Upload</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <Button variant="outline">
                          Upload Image
                        </Button>
                        <p className="text-sm text-gray-600 mt-2">
                          PNG, JPG, WebP up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Attributes</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        placeholder="Attribute name (e.g., Year)"
                        className="w-full"
                      />
                      <Input
                        type="text"
                        placeholder="Value"
                        className="w-full"
                      />
                      <Button variant="outline" size="sm">
                        Add Attribute
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Add unlimited custom attributes for your coin
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recipient</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wallet Address
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter recipient wallet address (or leave blank for self)"
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Leave blank to mint to your own wallet
                    </p>
                  </div>
                </div>

                {/* Mint Button */}
                <div className="pt-6">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Mint NFT
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
